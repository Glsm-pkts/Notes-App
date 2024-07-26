import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../typees";


const Layout = ({notes}: {notes: Note[]}) => {

//! urldeki id al
const {id} = useParams()

//!notes dizisinde elemanı ara
const found = notes.find((i) => i.id === id)

//! bulamazsan anasayfaya yönlendir
if(!found) return <Navigate to={"/"} replace/>

//! parent route içerisinde alt route'u renderla
  return (
      <Outlet context={found}/>//! bir alt birleşeni almak için kullanılır ve sadece prop olarak context alır diğer billeşenlerde useoutletcontext olara verilir.

  );
}

export default Layout;
