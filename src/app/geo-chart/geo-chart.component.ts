import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Model,GeoPushpinChart} from '@gooddata/react-components';


export interface GeoChartProps {
  projectId: any;
  location: any;
  size?: any;
  color?: any;
  segmentBy?: any;
  config?: any;
}

@Component({
  selector: 'app-geo-chart',
  template: '<div class="geo-chart" style="height:500px; width:500px" [id]="rootDomID"></div>',
})


export class GeoChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit  {
  public rootDomID: string;
  projectId = 'cxmrlinh0gcspntxsytkwcky7gkay4so';
  location = Model.attribute('label.geopushpin.location.latlon').localIdentifier('location')
  amount = Model.measure('aazV2yX2gz2z').localIdentifier('amount');
  timeline = Model.measure('aiTEuXhZaJw5').localIdentifier('timeline');
  config={mapboxToken:"pk.eyJ1IjoiaW1udXR6IiwiYSI6ImNrMHAxY2UxZzBnc2EzZG11YmVhd2dubG0ifQ.bUTN7ceAHq6kVooe3MKgqg"}
  
  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): GeoChartProps {
    return {
      projectId: this.projectId,
      location: this.location,
      // size: this.size,
      config: { mapboxToken:"pk.eyJ1IjoiaW1udXR6IiwiYSI6ImNrMHAxY2UxZzBnc2EzZG11YmVhd2dubG0ifQ.bUTN7ceAHq6kVooe3MKgqg" },
    };
  }
  private isMounted(): boolean {
    return !!this.rootDomID;
  }
  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(GeoPushpinChart, this.getProps()), this.getRootDomNode());
    }
  }
  ngOnInit() {
    this.rootDomID = uuid.v1();
  }
  ngOnChanges() {
    this.render();
  }
  ngAfterViewInit() {
    this.render();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
