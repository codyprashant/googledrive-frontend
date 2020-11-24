import {GitPullRequest } from "react-feather";
export const MENUITEMS = [
  {
    menutitle: "File Management",
    menucontent: "Manage files here",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/app/file-manager`,
        icon: GitPullRequest,
        title: "File Manager",
        type: "link",
      },
    ],
  },
];
