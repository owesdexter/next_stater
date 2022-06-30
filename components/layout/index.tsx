import Header from './header';

// TODO: declare children type
export default function Layout({ children }: any) {
  return (
    <div className="layout-wrapper d-flex">
      <Header />
      <div className="page-container">
        {children}
      </div>
    </div>
  )
}

