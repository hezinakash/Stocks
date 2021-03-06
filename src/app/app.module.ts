import { AlpaVantageService } from "./services/alpaVantage-service/alpa-vantage.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ChartModule, HIGHCHARTS_MODULES } from "angular-highcharts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StockComponent } from "./components/stock/stock.component";

import stock from "highcharts/modules/stock.src";
import more from "highcharts/highcharts-more.src";
import { MaterialsModule } from "./modules/materials/materials.module";
import { MainComponent } from "./components/main/main.component";

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  declarations: [AppComponent, StockComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    MaterialsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AlpaVantageService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
