import React from "react"
import Breadcrumb from './breadcrumb';
import Navbar from './navbar';

export default function Layout({ children, breadcrumbs }) {

  return (
    <>
        <Navbar />
        {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />}
        {children}
    </>
  )
}
