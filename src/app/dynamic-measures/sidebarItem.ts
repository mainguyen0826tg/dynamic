import { projectId } from '../../utils/fixtures';


  export interface SidebarItem {
    link: any;
    title: string;
  }
  
   export const SIDEBARITEM : SidebarItem [] = [
    {
      link:`/gdc/md/${projectId}/obj/6694`,
      title: "$ Franchise Fees (Ad Royalty)",
    },
    {
      link: `/gdc/md/${projectId}/obj/6685`,
      title: "$ Franchise Fees",
    }
  ];