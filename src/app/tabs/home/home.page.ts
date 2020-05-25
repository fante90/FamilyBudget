import { Component, ViewChild } from '@angular/core';
import { Moviment } from '../../classes/Moviment';
import { UIService } from '../../services/ui.service';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { Chart } from 'chart.js';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('outChart', { static: false }) outChart;
  @ViewChild('inChart', { static: false }) inChart;
  @ViewChild('listSlider', { static: false }) listSlider: IonSlides;

  public yearlyBalance = '';
  public totalOut = '';
  public totalIn = '';
  public categoriesTotalOut = [];
  public categoriesTotalIn = [];

  chartSliderOpts = {
    initialSlide: 0,
    speed: 400
  };
  listSliderOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  }
  private outChartRef = null;
  private inChartRef = null;

  constructor(
    private appDBService: FamilyBudgetDBService,
    private uiService: UIService) {
  }

  ionViewDidEnter() {
    this.calcYearlyBalance();
  }

  /**
   * Metodo che calcolo il bilancio annuale in base alla somma dei movimenti dal 1 gennaio a oggi
   * e genera i due grafici di entrate e uscite
   */
  private calcYearlyBalance() {
    this.yearlyBalance = '';
    const selector = {
      entity: Moviment.entityName,
      date: {
        $gte: new Date(new Date().getFullYear(), 0, 1, 0, 0), // 1 gennaio anno corrente
        $lte: new Date() // ora + un minuto per essere certo di prendere tutti i movimenti
      }
    };
    const processedCatsOut = [];
    const processedCatsIn = [];
    const chartDataOut = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };
    const chartDataIn = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };
    Moviment.getEntries(this.appDBService, false, null, selector).then(result => {
      let sum = 0;
      let sumOut = 0;
      let sumIn = 0;
      this.categoriesTotalIn = [];
      this.categoriesTotalOut = [];
      result.forEach(moviment => {
        sum += (moviment.value * ((moviment.type === 'P') ? 1 : -1));
        // valuto i dati per i grafici di entrate e uscite
        if (moviment.type === 'P') { // grafico entrate
          sumIn += moviment.value;
          const catIndex = processedCatsIn.indexOf(moviment.id_category);
          if (catIndex >= 0) { // categoria già presente, sommo
            chartDataIn.datasets[0].data[catIndex] += moviment.value;
            this.categoriesTotalIn[catIndex].value += moviment.value;
          } else { // categoria non ancora presente, creo
            processedCatsIn.push(moviment.id_category);
            chartDataIn.labels.push(moviment.category.description);
            chartDataIn.datasets[0].data.push(moviment.value);
            chartDataIn.datasets[0].backgroundColor.push(moviment.category.color);
            const catTotal = Object.assign({ value: moviment.value }, moviment.category);
            this.categoriesTotalIn.push(catTotal);
          }
        } else { // grafico uscite
          sumOut += moviment.value;
          const catIndex = processedCatsOut.indexOf(moviment.id_category);
          if (catIndex >= 0) { // categoria già presente, sommo
            chartDataOut.datasets[0].data[catIndex] += moviment.value;
            this.categoriesTotalOut[catIndex].value += moviment.value;
          } else { // categoria non ancora presente, creo
            processedCatsOut.push(moviment.id_category);
            chartDataOut.labels.push(moviment.category.description);
            chartDataOut.datasets[0].data.push(moviment.value);
            chartDataOut.datasets[0].backgroundColor.push(moviment.category.color);
            const catTotal = Object.assign({ value: moviment.value }, moviment.category);
            this.categoriesTotalOut.push(catTotal);
          }
        }
      });
      this.yearlyBalance = ((sum >= 0) ? '+' : '') + sum.toFixed(2);
      this.totalIn = sumIn.toFixed(2);
      this.totalOut = '-' + sumOut.toFixed(2);

      // per ogni categoria aggiungo il valore percentuale in cui incide sul totale
      for (const [i, cat] of this.categoriesTotalOut.entries()) {
        this.categoriesTotalOut[i].perc = cat.value / sumOut * 100;
      }
      for (const [i, cat] of this.categoriesTotalIn.entries()) {
        this.categoriesTotalIn[i].perc = cat.value / sumIn * 100;
      }
      // ordino le categorie da quella che incide di più a quella che incide di meno
      this.categoriesTotalOut.sort((a, b) => {
        return (a.value > b.value) ? -1 : 1;
      });
      this.categoriesTotalIn.sort((a, b) => {
        return (a.value > b.value) ? -1 : 1;
      });
      this.outChartRef = new Chart(this.outChart.nativeElement, {
        type: 'doughnut',
        data: chartDataOut,
        options: {
          circumference: Math.PI,
          rotation: -Math.PI,
          legend: { display: false },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let label = data.labels[tooltipItem.index] || '';
                if (label) {
                  label += ': ';
                }
                label += data.datasets[0].data[tooltipItem.index].toFixed(2) + ' €';
                return label;
              }
            }
          }
        }
      });
      this.inChartRef = new Chart(this.inChart.nativeElement, {
        type: 'doughnut',
        data: chartDataIn,
        options: {
          circumference: Math.PI,
          rotation: -Math.PI,
          legend: { display: false },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let label = data.labels[tooltipItem.index] || '';
                if (label) {
                  label += ': ';
                }
                label += data.datasets[0].data[tooltipItem.index].toFixed(2) + ' €';
                return label;
              }
            }
          }
        }
      });
    });
  }

  slideNext() {
    this.listSlider.slideNext();
  }

  slidePrev() {
    this.listSlider.slidePrev();
  }
}
