import Link from "next/link";
type TRoute = {
  title: string,
  iconName: string,
  path: string
}
// type TNavsProp ={
//   routes: TRoute[]
// }

const routes: TRoute[] = [
  // {
  //   title: '__t_Home',
  //   iconName: '',
  //   path: '',
  // },
  {
    title: '__t_Exporter',
    iconName: '',
    path: 'exporter',
  },
  // {
  //   title: '__t_Record',
  //   iconName: '',
  //   path: 'record',
  // },
];

export default function Navs() {
  return (
    <ul className="routes-wrapper">
      {routes.map((route, index) =>
        <Link href={`/${route.path}`} passHref key={route.title} className="route-link">
          <div className="link-wrapper">
            <div>{route.iconName}</div>
            <div>{route.title}</div>
          </div>
        </Link>
      )}
    </ul>
  )
}