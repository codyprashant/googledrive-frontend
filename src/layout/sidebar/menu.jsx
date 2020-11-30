import { Send, Activity, Trash2, HardDrive } from "react-feather";
export const MENUITEMS = [
  {
    menutitle: "File Management",
    menucontent: "Manage files here",
    Items: [
      {
        path: `/app/file-manager`,
        icon: HardDrive,
        title: "Drive",
        type: "link",
      },
      {
        path: `/app/trash`,
        icon: Trash2,
        title: "Trash",
        type: "link",
      },
      {
        path: `/app/tempShare`,
        icon: Send,
        title: "Share Files",
        type: "link",
      },
      {
        path: `/app/tempShareHistory`,
        icon: Activity,
        title: "Share Files History",
        type: "link",
      },
      // {
      //   path: `/app/tempShareDrive`,
      //   icon: GitPullRequest,
      //   title: "Share Files Drive",
      //   type: "link",
      // },
    ],
  }
];
