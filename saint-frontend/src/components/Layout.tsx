import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      {props.children}
      <Footer/>
    </>
  );
}
