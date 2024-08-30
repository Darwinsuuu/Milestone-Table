import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'milestone-table';

  constructor(private httpClient: HttpClient) {

  }

  milestones: any[] = [];
  modules: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.httpClient.get("http://localhost:3000/milestoneTable")
      .subscribe((response: any) => {
        this.modules = this.getModuleList(response.data);
        console.log(this.modules);
        this.milestones = response.data
      })
  }

  // get moduleNames
  getModuleList(data: any) {
    return data.flatMap((milestone: any) =>
      milestone.dashboardProjectModuleViewModel.map((module: any) => ({
        moduleId: module.moduleId,
        moduleName: module.moduleName,
        totalUserStory: module.totalUserStory,
        totalPercentageDone: module.totalPercentageDone,
        totalPercentageRemaining: module.totalPercentageRemaining
      }))
    )
  }

  getModuleProgress(module: any, milestoneModule: any): boolean {
    const milestoneModuleIds = milestoneModule.dashboardProjectModuleViewModel.map((module: any) => module.moduleId);
    
    if (milestoneModuleIds.includes(module.moduleId)) {
      return true;
    }
    return false;
  }


  computeWidth(columnNo: number, percent: number, isActive: boolean) {
    let totalPrecentageDone = (columnNo * 100) * (percent / 100);
    if (!isActive) {
      return 0;
    }
    return totalPrecentageDone;
  }


}
