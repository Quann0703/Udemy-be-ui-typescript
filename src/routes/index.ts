import config from "~/config";
import About from "~/pages/About";
import Category from "~/pages/Category";
import Courses from "~/pages/Courses";
import Field from "~/pages/Field";
import Home from "~/pages/Home";
import Invoice from "~/pages/Invoice";
import Lesson from "~/pages/Lesson";
import Register from "~/pages/Register";
import Topic from "~/pages/Topic";
import User from "~/pages/User";
import Receipt from "~/pages/Receipt";

type RouteTypes = {
  path: string;
  component: React.FunctionComponent<any>;
  layout?: React.FunctionComponent<any> | null;
  children?: {
    path: string;
    component: React.FunctionComponent;
  }[];
};

const publicRoutes: RouteTypes[] = [
  { path: config.routes.home, component: Home },
  { path: config.routes.about, component: About },
  { path: config.routes.user, component: User },
  { path: config.routes.category, component: Category },
  { path: config.routes.field, component: Field },
  { path: config.routes.topic, component: Topic },
  { path: config.routes.course, component: Courses },
  { path: config.routes.lesson, component: Lesson },
  { path: config.routes.register, component: Register },
  { path: config.routes.invoice, component: Invoice },
  { path: config.routes.receipt, component: Receipt, layout: null },
];

export { publicRoutes };
