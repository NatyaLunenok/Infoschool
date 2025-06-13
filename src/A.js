import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'
import ReactTable from './Tables/Journal/Journal'
function A() {
  return (
    // <div style={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   minHeight: '100vh',
    //   margin: 0}}>
    <>
        <Header/>
        <ReactTable/>
        <Footer/></>

    // </div>
  );
}

export default A;
