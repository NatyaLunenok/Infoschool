import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'
import ReactTable from './Tables/Journal/Journal'
function A() {
    const tableData = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'London' },
    { name: 'Peter Jones', age: 40, city: 'Paris' },
  ];
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
        <ReactTable data={tableData}/>
        <Footer/></>

    // </div>
  );
}

export default A;
