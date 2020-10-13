import { Component, ViewChild, ElementRef } from '@angular/core';
import { Moviment } from 'src/app/classes/Moviment';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Chart } from 'chart.js';
import { IonSlides, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage {
  @ViewChild('statsOutChart', { static: false }) statsOutChart;
  @ViewChild('statsInChart', { static: false }) statsInChart;
  @ViewChild('chartSlider', { static: false }) chartSlider: IonSlides;
  @ViewChild('mainContent', { static: false }) mainContent: IonContent;

  public chartFilterModel = { // modello di filtri della videata
    fromDate: null,
    toDate: null,
    offset: 0,
    dateRange: 'YEAR'
  };
  public chartCategsDetailTIn = []; // totale entrate raggruppato per categoria
  public chartCategsDetailTOut = []; // totale uscite raggruppato per categoria
  public chartCategsDetail = []; // dettaglio totale/specifico asse x raggruppato per categoria
  public chartSelectedEl = ''; // label di intestazione del totale raggruppato che rappresenta l'elemento selezionato
  public currentChart = 'out'; // indica il grafico visibile a video

  private chartRefOut = null; // riferimento la grafico uscite
  private chartRefIn = null; // riferimento la grafico entrate

  public chartSliderOpts = { // configurazione slider che contiene i grafici
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  public totalOut = 0; // totale uscite
  public totalIn = 0; // totale entrate

  constructor(
    private appDBService: FamilyBudgetDBService,
    private utilityService: UtilityService,
    private router: Router) { }

  /**
   * Metodo che inizializza/aggiorna il grafico
   */
  public refreshChart(event = null) {
    // creo il selector in base ai filtri impostati
    const selector = {
      entity: Moviment.entityName,
      date: {
        $gte: this.utilityService.dateToISO(this.chartFilterModel.fromDate),
        $lte: this.utilityService.dateToISO(this.chartFilterModel.toDate)
      }
    };

    Moviment.getEntries(this.appDBService, false, null, selector).then(result => {
      const moviments: Array<IMoviment> = result;
      this.totalOut = 0;
      this.totalIn = 0;
      this.chartCategsDetailTIn = [];
      this.chartCategsDetailTOut = [];
      const months = ['Ge', 'Fe', 'Ma', 'Ap', 'Ma', 'Gi', 'Lu', 'Ag', 'Se', 'Ot', 'No', 'Di'];
      // In base al tipo di range di date determino le label dell'asse x (mesi, giorni del mese o giorni della settimana)
      let xLabels: Array<string> = [];
      if (this.chartFilterModel.dateRange === 'YEAR') {
        xLabels = months;
      } else if (this.chartFilterModel.dateRange === 'MONTH') {
        // gli elementi sono i giorni del mese
        for (let i = 0; i < new Date(this.chartFilterModel.toDate).getDate(); i++) {
          xLabels.push('' + (i + 1));
        }
      } else if (this.chartFilterModel.dateRange === 'PERIOD') {
        // gli elementi sono i giorni del periodo
        const startPerDate = new Date(this.chartFilterModel.fromDate);
        const endPerDate = new Date(this.chartFilterModel.toDate);
        const labelMonth = (startPerDate.getMonth() !== endPerDate.getMonth());
        let labelDate = startPerDate;
        while (labelDate.getTime() <= endPerDate.getTime()) {
          let label = ('00' + labelDate.getDate()).slice(-2);
          if (labelMonth) {
            label += '/' + ('00' + (labelDate.getMonth() + 1).toString()).slice(-2);
            //label += ' ' + months[labelDate.getMonth()];
          }
          xLabels.push(label);
          labelDate = new Date(labelDate.getTime() + (1000 * 60 * 60 * 24));
        }
      } else {
        // in caso di settimana o giorno specifico il numero di elementi sono i giorni della settimana
        xLabels = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'];
      }
      // scorro i movimenti e creo un dataset per ogni categoria
      const chartDatasetsOut: Array<any> = [];
      const chartDatasetsIn: Array<any> = [];
      const evaluatedCatOut: Array<any> = [];
      const evaluatedCatIn: Array<any> = [];
      moviments.forEach((moviment) => {
        if (evaluatedCatIn.indexOf(moviment.id_category) < 0 && evaluatedCatOut.indexOf(moviment.id_category) < 0) {
          // devo creare il dataset della categoria
          const catDataset = {
            id_category: moviment.category._id,
            label: moviment.category.description,
            color: moviment.category.color,
            icon: moviment.category.icon,
            backgroundColor: this.utilityService.hexToRgbA(moviment.category.color, 0.5),
            borderColor: moviment.category.color,
            borderWidth: 1,
            data: []
          };
          // inizializzo per ogni elemento dell'asse x il corrispondente indice nell'array data inizializzato a zero
          xLabels.forEach(() => {
            catDataset.data.push(0);
          });
          if (moviment.category.type === 'P') {
            chartDatasetsIn.push(catDataset);
            evaluatedCatIn.push(moviment.id_category);
          } else {
            chartDatasetsOut.push(catDataset);
            evaluatedCatOut.push(moviment.id_category);
          }
        }
        // estraggo il riferimento al dataset della categoria
        let datasetIndex = 0;
        if (moviment.category.type === 'P') {
          datasetIndex = evaluatedCatIn.indexOf(moviment.id_category);
          this.totalIn += moviment.value;
        } else {
          datasetIndex = evaluatedCatOut.indexOf(moviment.id_category);
          this.totalOut += (moviment.value * -1);
        }
        // Aggiungo nel dataset nell'array data all'indice corretto il valore
        if (this.chartFilterModel.dateRange === 'YEAR') {
          // se il filtro è per anno uso come riferimento il mese della data del movimento
          const month = new Date(moviment.date).getMonth();
          if (moviment.category.type === 'P') {
            chartDatasetsIn[datasetIndex].data[month] += moviment.value;
          } else {
            chartDatasetsOut[datasetIndex].data[month] += moviment.value;
          }
        } else if (this.chartFilterModel.dateRange === 'MONTH') {
          // se il filtro è per mese uso come riferimento il giorno del mese della data del movimento
          const dayOfMonth = new Date(moviment.date).getDate();
          if (moviment.category.type === 'P') {
            chartDatasetsIn[datasetIndex].data[dayOfMonth - 1] += moviment.value;
          } else {
            chartDatasetsOut[datasetIndex].data[dayOfMonth - 1] += moviment.value;
          }
        } else if (this.chartFilterModel.dateRange === 'PERIOD') {
          // se il filtro è per periodo uso come riferimento la differenza in giorni tra l'inizio del periodo e la data del movimento
          const movDate = new Date(
            new Date(moviment.date).getFullYear() + '-' +
            ('00' + (new Date(moviment.date).getMonth() + 1)).slice(-2) + '-' +
            ('00' + new Date(moviment.date).getDate()).slice(-2) +
            'T00:00:00.000Z'
          );
          const days = parseInt(
            (
              Math.abs(new Date(this.chartFilterModel.fromDate).getTime() - movDate.getTime())
              / 1000 / 60 / 60 / 24
            ).toString(), 10
          );
          if (moviment.category.type === 'P') {
            chartDatasetsIn[datasetIndex].data[days] += moviment.value;
          } else {
            chartDatasetsOut[datasetIndex].data[days] += moviment.value;
          }
        } else {
          // se il filtro è per settimana o giorno specifico uso come riferimento il giorno della settimana della data del movimento
          let dayOfWeek = new Date(moviment.date).getDay() - 1;
          if (dayOfWeek < 0) { // questo perchè il metodo ritorna 0 quando è domenica
            dayOfWeek = 6;
          }
          if (moviment.category.type === 'P') {
            chartDatasetsIn[datasetIndex].data[dayOfWeek] += moviment.value;
          } else {
            chartDatasetsOut[datasetIndex].data[dayOfWeek] += moviment.value;
          }
        }
      });
      if (this.chartRefIn) {
        this.chartRefIn.destroy();
      }
      if (this.chartRefOut) {
        this.chartRefOut.destroy();
      }
      this.chartRefIn = new Chart(this.statsInChart.nativeElement, {
        type: 'bar',
        data: {
          labels: xLabels,
          datasets: chartDatasetsIn
        },
        options: {
          legend: { display: false },
          tooltips: {
            enabled: false
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                display: true,
                fontSize: 9,
                callback: (value, index, values) => {
                  return value + ' € ';
                }
              }
            }]
          },
          onClick: (e) => {
            this.showChartCategsDetail(e, this.chartRefIn);
          }
        }
      });
      this.chartRefOut = new Chart(this.statsOutChart.nativeElement, {
        type: 'bar',
        data: {
          labels: xLabels,
          datasets: chartDatasetsOut
        },
        options: {
          legend: { display: false },
          tooltips: {
            enabled: false
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                display: true,
                fontSize: 9,
                callback: (value, index, values) => {
                  return value + ' € ';
                }
              }
            }]
          },
          onClick: (e) => {
            this.showChartCategsDetail(e, this.chartRefOut);
          }
        }
      });

      // Valorizzo le due proprietà del totale entrate e uscite raggruppati per categoria da mostrare
      // sotto il grafico quando non si è selezionato un elemento dell'asse x
      this.chartCategsDetailTIn = Object.assign([], chartDatasetsIn);
      this.chartCategsDetailTOut = Object.assign([], chartDatasetsOut);
      this.chartCategsDetailTIn.forEach(categ => {
        categ.description = categ.label;
        categ.index = -1;
        categ.value = categ.data.reduce((acc, cur) => acc + cur, 0); // sommo i valori del dataset per ottenere il totale di categoria
        categ.perc = categ.value / this.totalIn * 100;
      });
      this.chartCategsDetailTOut.forEach(categ => {
        categ.description = categ.label;
        categ.index = -1;
        categ.value = categ.data.reduce((acc, cur) => acc + cur, 0); // sommo i valori del dataset per ottenere il totale di categoria
        categ.perc = categ.value / this.totalOut * 100;
      });
      // ordino entrambi dalla categoria che incide di più a quella meno
      this.chartCategsDetailTIn.sort((a, b) => {
        return (a.value > b.value) ? -1 : 1;
      });
      this.chartCategsDetailTOut.sort((a, b) => {
        return (a.value > b.value) ? -1 : 1;
      });
      this.setChartCategsTotalDetail();

      if (event) {
        event.target.complete();
      }
    });
  }

  /**
   * Metodo richiamato quando cambia il filtro nel componente fb-date-filter-toolbar
   * @param filterData oggetto che contiene data inizio e data fine da impostare come filtro
   */
  dateFilterChanged(filterData) {
    this.chartFilterModel.fromDate = filterData.start.toISOString();
    this.chartFilterModel.toDate = filterData.end.toISOString();
    this.chartFilterModel.dateRange = filterData.range;
    this.chartFilterModel.offset = filterData.offset;
    this.refreshChart();
  }

  /**
   * Metodo richiamato quando viene switchato da uscite a entrate e viceversa
   */
  segmentChanged(ev: any) {
    if (ev.detail && ev.detail.value) {
      this.currentChart = ev.detail.value;
      if (ev.detail.value === 'in') {
        this.chartSlider.slideNext();
      } else {
        this.chartSlider.slidePrev();
      }
      this.setChartCategsTotalDetail(); // inizializzo il dettaglio delle categorie del grafico che si va a mostrare
    }
  }

  /**
   * Metodo richiamato al click sul grafico, mostra in dettaglio le categorie relative al corrispondente valore di asse x cliccato
   * @param e evento
   * @param chartRef riferimento al grafico
   */
  private showChartCategsDetail(e, chartRef) {
    this.chartCategsDetail = [];
    const activeElements = chartRef.getElementsAtXAxis(e);
    if (activeElements.length > 0) {
      const chartIndex = activeElements[0]._index;
      let totValue = 0;
      // calcolo il totale delle categorie coinvolte per poi calcolare la percentuale di incidenza
      chartRef.config.data.datasets.forEach(dataset => {
        totValue += parseFloat(dataset.data[chartIndex]);
      });
      chartRef.config.data.datasets.forEach(dataset => {
        // aggiungo la categoria solo se ha un valore > 0
        if (parseInt(dataset.data[chartIndex], 10) > 0) {
          this.chartCategsDetail.push({
            color: dataset.color,
            icon: dataset.icon,
            description: dataset.label,
            id_category: dataset.id_category,
            index: chartIndex, // indice che rappresenta l'elemento dell'asse x cliccato
            value: parseFloat(dataset.data[chartIndex]),
            perc: parseFloat(dataset.data[chartIndex]) / totValue * 100
          });
        }
      });
      this.chartSelectedEl = chartRef.config.data.labels[chartIndex];
      // ordino le categoria da quella che incide di più a quella meno
      this.chartCategsDetail.sort((a, b) => {
        return (a.value > b.value) ? -1 : 1;
      });
      // scroll verso il dettaglio delle categorie
      this.scrollToBottom(chartRef);
    } else {
      // nel caso nessun elemento sia selezionato mostro il totale entrate/uscite
      this.setChartCategsTotalDetail();
    }
  }

  /**
   * Effettua lo scroll del contenuto principale per mostrare il dettaglio delle categorie sotto il grafico
   * @param chartRef riferimento al grafico per ottenerne l'altezza da scrollare
   */
  private async scrollToBottom(chartRef) {
    try {
      this.mainContent.scrollToPoint(0, chartRef.height, 1500);
    } catch (err) { }
  }

  /**
   * Mostra la lista dei movimenti filtrata per la categoria ricevuta per parametro
   * @param category categoria per cui mostrare il movimenti
   */
  showCatMoviments(category) {
    // calcolo il filtro di data da passare alla videata per ottenere i movimenti dell'asse x selezionato
    let offset = 0;
    let dateType = 'YEAR';
    let custStartDate = null;
    let custEndDate = null;
    if (category.index === -1) {
      // in questo caso sto visualizzando il raggruppamento delle categorie in base al totale quindi il filtro di data
      // è esattamente quello del modello di filtro
      dateType = this.chartFilterModel.dateRange;
      offset = this.chartFilterModel.offset;
      if (this.chartFilterModel.dateRange === 'PERIOD') {
        custStartDate = this.chartFilterModel.fromDate;
        custEndDate = this.chartFilterModel.toDate;
      }
    } else if (this.chartFilterModel.dateRange === 'YEAR') {
      // se il filtro della videata è per anno devo ricavare il mese selezionato
      const filterDateYear = new Date(this.chartFilterModel.fromDate).getFullYear();
      const currentDateYear = new Date().getFullYear();
      const currentDateMonth = new Date().getMonth();
      offset = (filterDateYear - currentDateYear) * 12;
      offset += (category.index - currentDateMonth);
      dateType = 'MONTH';
    } else {
      // in tutti gli altri casi mostro il giorno selezionato
      const today = new Date();
      const filterDate = new Date(this.chartFilterModel.fromDate);
      let dayOfFilter = null;
      if (this.chartFilterModel.dateRange === 'MONTH') {
        dayOfFilter = new Date(filterDate.getFullYear(), filterDate.getMonth(), category.index + 1);
      } else if (this.chartFilterModel.dateRange === 'WEEK' || this.chartFilterModel.dateRange === 'PERIOD') {
        let tmpDate = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
        dayOfFilter = new Date(tmpDate.getTime() + (1000 * 60 * 60 * 24 * category.index));
      } else {
        dayOfFilter = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
      }

      const diff = dayOfFilter.getTime() - today.getTime();
      offset = parseInt((diff / 1000 / 60 / 60 / 24).toString(), 10);
      dateType = 'TODAY';
    }

    this.router.navigate([
      '/t/list-moviments',
      {
        category: category.id_category,
        filterDateType: dateType,
        filterDateOffset: offset,
        filterDateStartCustDate: custStartDate,
        filterDateEndCustDate: custEndDate
      }
    ]);
  }

  /**
   * Valorizza il dettaglio categorie totale del grafico in base al grafico visualizzato
   */
  setChartCategsTotalDetail() {
    if (this.currentChart === 'in') {
      this.chartSelectedEl = 'Entrate';
      this.chartCategsDetail = this.chartCategsDetailTIn;
    } else {
      this.chartSelectedEl = 'Uscite';
      this.chartCategsDetail = this.chartCategsDetailTOut;
    }
  }
}
