import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { KpiComponent } from './kpi/kpi.component';
// import { LineChartComponent } from './line-chart/line-chart.component';
// import { ColumnChartComponent } from './column-chart/column-chart.component';
// import { PivotTableComponent } from './pivot-table/pivot-table.component';
// import { MeasureValueFilterComponent } from './measure-value-filter/measure-value-filter.component';
// import { AttributeFilterComponent } from './attribute-filter/attribute-filter.component';
// import { AttributeFilterNLineChartComponent } from './attribute-filter-nline-chart/attribute-filter-nline-chart.component';
// import { MeasureValueFilterNLineChartComponent } from './measure-value-filter-nline-chart/measure-value-filter-nline-chart.component';
import { MeasureValueFilterWFormattedPercentageComponent } from './measure-value-filter-wformatted-percentage/measure-value-filter-wformatted-percentage.component';
import { MeasureValueFilterPercentageDropdownComponent } from './measure-value-filter-percentage-dropdown/measure-value-filter-percentage-dropdown.component';
import { MeasureValueFilterDropdownRatioExampleComponent } from './measure-value-filter-dropdown-ratio-example/measure-value-filter-dropdown-ratio-example.component';
import { MeasureValueFilterExamplesComponent } from './measure-value-filter-example/measure-value-filter-example.component';
import { GeoChartComponent } from './geo-chart/geo-chart.component';
import { MeasureValueFilterShownInPercentComponent } from './measure-value-filter-shown-in-percent/measure-value-filter-shown-in-percent.component';
import { MeasureValueFilterStackto100PercentComponent } from './measure-value-filter-stackto100-percent/measure-value-filter-stackto100-percent.component';
import { WithFortmattedPercentComponent } from './with-fortmatted-percent/with-fortmatted-percent.component';
import { DynamicMeasuresComponent } from './dynamic-measures/dynamic-measures.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [
    AppComponent,
    // KpiComponent,
    // LineChartComponent,
    // ColumnChartComponent,
    // PivotTableComponent,
    // MeasureValueFilterComponent,
    // AttributeFilterComponent,
    // AttributeFilterNLineChartComponent,
    // MeasureValueFilterNLineChartComponent,
    MeasureValueFilterWFormattedPercentageComponent,
    MeasureValueFilterPercentageDropdownComponent,
    MeasureValueFilterDropdownRatioExampleComponent,
    MeasureValueFilterExamplesComponent,
    GeoChartComponent,
    MeasureValueFilterShownInPercentComponent,
    MeasureValueFilterStackto100PercentComponent,
    WithFortmattedPercentComponent,
    DynamicMeasuresComponent,
    DynamicComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
