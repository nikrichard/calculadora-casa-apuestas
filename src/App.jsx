import React, { useState, useEffect } from "react";
import "./App.css";
import {Modal, Button} from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initForm = {
  price: ''
}

//Datos de los Inputs
const calculatorForm = {
  USDCuotaD: 0,
  USDCuotaB: 0,
  USDInversionD: 0
}

//Resultados de la table
const dataTable = {
  USDGananciaPotencialD: 0, //1
  USDInversionB:0, //2
  SOLESCuotaD:0, //8
  SOLESCuotaB:0, //9
  SOLESInversionD:0, //10
  //Segundoclick
  USDGananciaPotencialB:0, //3
  SOLESGananciaPotencialD:0, //12
  //Tercerclick
  USDGananciaRealD:0, //4
  SOLESInversionB:0, //11
  //Cuartoclick
  USDGananciaRealB:0, //5
  USDPorcentajeD:0, //6
  SOLESGananciaPotencialB:0, //13
  SOLESGananciaRealD:0, //14
  //Quintoclick
  USDPorcentajeB:0, //7
  SOLESGananciaRealB:0, //15
  SOLESPorcentajeD:0,//16
  SOLESPorcentajeB:0//17
}

function App() {
  const [form, setForm] = useState(initForm); //formulario de precio de dolar
  const [priceUSD, setPriceUSD] = useState(localStorage.getItem('priceDolar'))

  //UseStates calculatorForm
  const [calculator, setCalculator] = useState(calculatorForm)
  const [dataResult, setDataResult] = useState(dataTable);

  //Cuarto valor dinamico
  const [USDInversionB, setUSDInversionB] = useState(0); //MODIFICADO 1

  useEffect(()=>{
    var priceDolar = localStorage.getItem('priceDolar');
    setPriceUSD(priceDolar)
  },[])


  //Modal Functions****************************
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setForm(initForm);
  }

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({
        ...form,
        [name]: value
    })
  }

  const handleBlur = (e) => {
    handleChange(e);
  }

  //Método para almacenar valor de Dolar en Localstogare - INICIO MODAL
  const handleSubmit = (e) => {
    e.preventDefault();
      try {
        localStorage.setItem("priceDolar", parseFloat(form.price))
        setPriceUSD(localStorage.getItem('priceDolar'));
        handleClose();
      } catch (error) {
        console.log(error)
      }
  }

  const handleChangeCalculator = (e) => {
    const {name, value} = e.target
    setCalculator({
      ...calculator,
      [name]: value
    })
    //calculateTable1()
  }

  const handleBlurCalculator = (e) => {
    handleChangeCalculator(e);
  }
  
  const calculateTable1 = () => {
    let setUSDGananciaPotencialD = parseFloat(calculator.USDCuotaD * calculator.USDInversionD) //1
    let setUSDInversionBFirst = parseFloat(setUSDGananciaPotencialD / calculator.USDCuotaB); //2
    let setSOLESCuotaD = parseFloat(calculator.USDCuotaD); //8
    let setSOLESCuotaB = parseFloat(calculator.USDCuotaB); //9
    let setSOLESInversionD = parseFloat(calculator.USDInversionD * priceUSD); //10
    //Segundoclick
    let setUSDGananciaPotencialB = parseFloat(setUSDInversionBFirst * calculator.USDCuotaB); //3
    let setSOLESGananciaPotencialD = parseFloat(setSOLESInversionD * setSOLESCuotaD); //12
    //Tercerclick
    let setUSDGananciaRealD = (setUSDGananciaPotencialD - calculator.USDInversionD - setUSDInversionBFirst); //4
    let setSOLESInversionB = (setUSDInversionBFirst * priceUSD); //11
    //Cuartoclick
    let setUSDGananciaRealB = (setUSDGananciaPotencialB - setUSDInversionBFirst - calculator.USDInversionD); //5
    let setUSDPorcentajeD = ((setUSDGananciaRealD * 100) / (parseFloat(calculator.USDInversionD) + setUSDInversionBFirst)); //6
    let setSOLESGananciaPotencialB = (setSOLESInversionB * setSOLESCuotaB); //13
    let setSOLESGananciaRealD = (setSOLESGananciaPotencialD - setSOLESInversionD - setSOLESInversionB); //14
    //Quintoclick
    let setUSDPorcentajeB = ((setUSDGananciaRealB * 100) / (parseFloat(calculator.USDInversionD) + setUSDInversionBFirst)); //7
    let setSOLESGananciaRealB = (setSOLESGananciaPotencialB - setSOLESInversionB - setSOLESInversionD); //15
    let setSOLESPorcentajeD = ((setSOLESGananciaRealD * 100) / (parseFloat(setSOLESInversionD) + setSOLESInversionB));//16
    //SextoClick    
    let setSOLESPorcentajeB = ((setSOLESGananciaRealB * 100) / (parseFloat(setSOLESInversionD) + setSOLESInversionB));//17
    
    let objResult = {
      USDGananciaPotencialD: setUSDGananciaPotencialD, //1
      SOLESCuotaD: setSOLESCuotaD, //8
      SOLESCuotaB: setSOLESCuotaB, //9
      SOLESInversionD: setSOLESInversionD, //10
      //Segundoclick
      USDGananciaPotencialB:setUSDGananciaPotencialB, //3
      SOLESGananciaPotencialD:setSOLESGananciaPotencialD, //12
      //Tercerclick
      USDGananciaRealD:setUSDGananciaRealD, //4
      SOLESInversionB:setSOLESInversionB, //11
      //Cuartoclick
      USDGananciaRealB:setUSDGananciaRealB, //5
      USDPorcentajeD:setUSDPorcentajeD, //6
      SOLESGananciaPotencialB:setSOLESGananciaPotencialB, //13
      SOLESGananciaRealD:setSOLESGananciaRealD, //14
      //Quintoclick
      USDPorcentajeB:setUSDPorcentajeB, //7
      SOLESGananciaRealB:setSOLESGananciaRealB, //15
      SOLESPorcentajeD:setSOLESPorcentajeD,//16
      SOLESPorcentajeB:setSOLESPorcentajeB//17
    }

    setDataResult(objResult);
    setUSDInversionB(setUSDInversionBFirst);
}

const calculateTable2 = () => {
  let setUSDGananciaPotencialD = parseFloat(calculator.USDCuotaD * calculator.USDInversionD) //1
  let setUSDInversionB = USDInversionB; //2
  let setSOLESCuotaD = parseFloat(calculator.USDCuotaD); //8
  let setSOLESCuotaB = parseFloat(calculator.USDCuotaB); //9
  let setSOLESInversionD = parseFloat(calculator.USDInversionD * priceUSD); //10
  //Segundoclick
  let setUSDGananciaPotencialB = parseFloat(setUSDInversionB * calculator.USDCuotaB); //3
  let setSOLESGananciaPotencialD = parseFloat(setSOLESInversionD * setSOLESCuotaD); //12
  //Tercerclick
  let setUSDGananciaRealD = (setUSDGananciaPotencialD - calculator.USDInversionD - setUSDInversionB); //4
  let setSOLESInversionB = (setUSDInversionB * priceUSD); //11
  //Cuartoclick
  let setUSDGananciaRealB = (setUSDGananciaPotencialB - setUSDInversionB - calculator.USDInversionD); //5
  let setUSDPorcentajeD = ((setUSDGananciaRealD * 100) / (parseFloat(calculator.USDInversionD) + parseFloat(setUSDInversionB))); //6
  let setSOLESGananciaPotencialB = (setSOLESInversionB * setSOLESCuotaB); //13
  let setSOLESGananciaRealD = (setSOLESGananciaPotencialD - setSOLESInversionD - setSOLESInversionB); //14
  //Quintoclick
  let setUSDPorcentajeB = ((setUSDGananciaRealB * 100) / (parseFloat(calculator.USDInversionD) + parseFloat(setUSDInversionB))); //7
  let setSOLESGananciaRealB = (setSOLESGananciaPotencialB - setSOLESInversionB - setSOLESInversionD); //15
  let setSOLESPorcentajeD = ((setSOLESGananciaRealD * 100) / (parseFloat(setSOLESInversionD) + setSOLESInversionB));//16
  //SextoClick    
  let setSOLESPorcentajeB = ((setSOLESGananciaRealB * 100) / (parseFloat(setSOLESInversionD) + setSOLESInversionB));//17
  
  let objResult = {
    USDGananciaPotencialD: setUSDGananciaPotencialD, //1
    SOLESCuotaD: setSOLESCuotaD, //8
    SOLESCuotaB: setSOLESCuotaB, //9
    SOLESInversionD: setSOLESInversionD, //10
    //Segundoclick
    USDGananciaPotencialB:setUSDGananciaPotencialB, //3
    SOLESGananciaPotencialD:setSOLESGananciaPotencialD, //12
    //Tercerclick
    USDGananciaRealD:setUSDGananciaRealD, //4
    SOLESInversionB:setSOLESInversionB, //11
    //Cuartoclick
    USDGananciaRealB:setUSDGananciaRealB, //5
    USDPorcentajeD:setUSDPorcentajeD, //6
    SOLESGananciaPotencialB:setSOLESGananciaPotencialB, //13
    SOLESGananciaRealD:setSOLESGananciaRealD, //14
    //Quintoclick
    USDPorcentajeB:setUSDPorcentajeB, //7
    SOLESGananciaRealB:setSOLESGananciaRealB, //15
    SOLESPorcentajeD:setSOLESPorcentajeD,//16
    SOLESPorcentajeB:setSOLESPorcentajeB//17
  }

  setDataResult(objResult);
}

  //Función para resetear información de la tabla
  const resetTable = () => {
    setCalculator(calculatorForm)
    setDataResult(dataTable)
    setUSDInversionB(0)
  }

  const handleSelectInput = (e) => {
    e.target.select();
  }

  //Estado del formulario USDInversionB/////////////////////
  const handleChangeUSDInversionB = (e) => {
    setUSDInversionB(e.target.value);
  }

  const handleBlurUSDInversionB = (e) => {
    handleChangeUSDInversionB(e)
  }

  function handleKeyDown(e){
    if(e.keyCode === 37) { //Izquierda
      if(document.activeElement.id === "USDInversionD"){
        document.getElementById("USDCuotaD").focus();
        handleFocus()
      }
      if(document.activeElement.id === "USDInversionB"){
        document.getElementById("USDCuotaB").focus();
        handleFocus()
      }
    }
    if(e.keyCode === 38) { //Arriba
      if(document.activeElement.id === "USDCuotaB"){
        document.getElementById("USDCuotaD").focus();
        handleFocus()
      }
      if(document.activeElement.id === "USDInversionB"){
        document.getElementById("USDInversionD").focus();
        handleFocus()
      }
    }
    if(e.keyCode === 39) { //Derecha
      if(document.activeElement.id === "USDCuotaD"){
        document.getElementById("USDInversionD").focus();
        handleFocus()
      }
      if(document.activeElement.id === "USDCuotaB"){
        document.getElementById("USDInversionB").focus();
        handleFocus()
      }
    }
    if(e.keyCode === 40) { //Abajo
      if(document.activeElement.id === "USDCuotaD"){
        document.getElementById("USDCuotaB").focus();
        handleFocus()
      }
      if(document.activeElement.id === "USDInversionD"){
        document.getElementById("USDInversionB").focus();
        handleFocus()
      }
    }
  }

  const handleKeyEnter = () => {
    if(document.activeElement.id === "USDCuotaD"){
      document.getElementById("USDInversionD").focus();
      handleFocus()
    }
    if(document.activeElement.id === "USDInversionD"){
      document.getElementById("USDCuotaB").focus();
      handleFocus()
    }
    if(document.activeElement.id === "USDCuotaB"){
      document.getElementById("USDCuotaD").focus();
      handleFocus()
    }
  }

  const handleFocus = () => {
    if(document.activeElement.id === "USDCuotaD"){
      const input = document.getElementById('USDCuotaD');
      setTimeout(()=>{
        input.select()
      },10)
    }
    if(document.activeElement.id === "USDInversionD"){
      const input = document.getElementById('USDInversionD');
      setTimeout(()=>{
        input.select()
      },10)
    }
    if(document.activeElement.id === "USDCuotaB"){
      const input = document.getElementById('USDCuotaB');
      setTimeout(()=>{
        input.select()
      },10)
    }
    if(document.activeElement.id === "USDInversionB"){
      const input = document.getElementById('USDInversionB');
      setTimeout(()=>{
        input.select()
      },10)
    }
  }

  return(
    <div className="body">
      <div className="container-fluid">
        <div className="row">
          <Modal 
          show={show} 
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          >
            <Modal.Body>
              <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={handleSubmit}>
                            <div className='formgroup'>
                                <label for="price" style={{fontSize: 13}}>Precio USD:</label>
                                <input 
                                  className="input" 
                                  name="price" 
                                  id="price" 
                                  type="text"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={form.price}
                                  autofocus
                                />
                            </div>
                            <div className='footerModal' style={{float: 'right'}}>
                              <Button className='btnclose' style={{marginRight: 10, fontSize: 15}} variant="danger" onClick={handleClose}>
                                Cancelar
                              </Button>
                              <input className="btn btn-print" type="submit" value="Guardar cambio" />
                            </div>
                        </form>
                    </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <div className='col-sm-12'>
            <div style={{backgroundColor: "black", color: "white", paddingTop: 4, paddingBottom: 1}}>
              <h6 className='text-end' onClick={handleShow} style={{fontSize: 12, fontWeight: 'bold', cursor: 'pointer', paddingLeft: 5, paddingRight: 5, textDecoration: 'underline'}}>Precio USD: {priceUSD === null || priceUSD === 0 || priceUSD === 0.00 ? '0.00' : priceUSD}</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div style={{fontSize: 14, fontWeight: 'bolder', backgroundColor: "#65F078", display: 'flex', flexDirection: "row"}}>
              <div>
                <button tabIndex="-1" onClick={resetTable} style={{marginTop: 2, marginBottom:2, marginLeft: 3, border: 'none', fontSize: 12, marginRight: 80}}>Refrescar</button>
              </div>
              <h6 style={{fontSize: 14, paddingRight: 30, fontWeight: "bold"}}>DOLARES AMERICANOS</h6>
            </div>
          </div>
        </div>
        <Row>
          <Col xs={5}>
            <div>
              <div>
                <div>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className='col-sm-6'><h6 style={{marginTop: 2, marginBottom: 0, fontSize: 12, marginLeft: 22, marginRight: 22}}>Cuota</h6></div>
                    <div className='col-sm-6'><h6 style={{marginTop: 2, marginBottom: 0, fontSize: 12, marginLeft: 22, marginRight: 22}}>Inversión</h6></div>
                  </div>
                </div>
                <div>
                  <b>D</b>
                  <input
                    pattern="[A-Za-z0-9_-]{1,15}"
                    style={{width: 100, height:22, marginTop: 3, marginBottom: 0, marginLeft: 2}}
                    id="USDCuotaD"
                    onKeyDown={handleKeyDown}
                    className='inputNumber'
                    type="text"
                    name="USDCuotaD"
                    onChange={handleChangeCalculator}
                    value={calculator.USDCuotaD}
                    onBlur={handleBlurCalculator}
                    onClick={handleSelectInput}
                    disabled={priceUSD === null || priceUSD === 0 || priceUSD === 0.00 ? true : false}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        calculateTable1()
                        document.getElementById("USDInversionD").focus();
                        handleFocus()
                      }
                    }}
                  />
                  <input
                    style={{width: 100, height:22, marginTop: 3, marginBottom: 0, marginLeft: 2}}
                    id="USDInversionD"
                    type='text'
                    onKeyDown={handleKeyDown}
                    className='inputNumber' 
                    name='USDInversionD'
                    onChange={handleChangeCalculator}
                    onBlur={handleBlurCalculator}
                    value={calculator.USDInversionD}
                    onClick={handleSelectInput}
                    disabled={priceUSD === null || priceUSD === 0 || priceUSD === 0.00 ? true : false}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        calculateTable1()
                        document.getElementById("USDCuotaB").focus();
                        handleFocus()
                      }
                    }}
                  />
                </div>
                <div>
                  <b>B</b>
                  <input
                    style={{width: 100, height:22, marginTop: 0, marginBottom: 0, marginLeft: 2}}
                    id="USDCuotaB"
                    type='text'
                    name="USDCuotaB"
                    onKeyDown={handleKeyDown}
                    className='inputNumber' 
                    onChange={handleChangeCalculator}
                    value={calculator.USDCuotaB}
                    onBlur={handleBlurCalculator}
                    onClick={handleSelectInput}
                    disabled={priceUSD === null || priceUSD === Number(0) || priceUSD === Number(0.00) ? true : false} 
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        calculateTable1()
                        document.getElementById("USDCuotaD").focus();
                        handleFocus()
                      }
                    }}
                  />
                  <input
                    style={{width: 100, height:22, marginTop: 0, marginBottom: 0, marginLeft: 2}}
                    id="USDInversionB"
                    type='text'
                    name="USDInversionB"
                    onKeyDown={handleKeyDown}
                    className='inputNumber'
                    tabIndex="-1"
                    onChange={handleChangeUSDInversionB}
                    onClick={handleSelectInput}
                    onBlur={handleBlurUSDInversionB}
                    value={USDInversionB}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        calculateTable2()
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={7}>
            <div style={{marginLeft: 9}}>
              <table style={{width: '100%'}}>
                <thead>
                  <tr className='text-center'>
                    <th  scope="col">Gan. Pot.</th>
                    <th style={{color:"#CBCBCB"}}>h</th>
                    <th scope="col">Gan. Real</th>
                    <th scope="col">Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{isNaN(dataResult.USDGananciaPotencialD) ? '0.00' : (dataResult.USDGananciaPotencialD).toFixed(2)}</td>
                    <td>{isNaN(dataResult.USDGananciaPotencialD / calculator.USDCuotaB) ? '0.00' : (dataResult.USDGananciaPotencialD / calculator.USDCuotaB).toFixed(2)}</td>
                    <td style={dataResult.USDGananciaRealD < 0 ? {backgroundColor: '#FF8383'} : (dataResult.USDGananciaRealD) > 15 ? {backgroundColor: '#59FF5B'} : {backgroundColor: '#FFE278'}}>{isNaN(dataResult.USDGananciaRealD) ? '0.00' : (dataResult.USDGananciaRealD).toFixed(2)}</td>
                    <td>{isNaN(dataResult.USDPorcentajeD) ? '0.00' : (dataResult.USDPorcentajeD).toFixed(9)}</td>
                  </tr>
                  <tr>
                    <td>
                      {
                        isNaN(USDInversionB * calculator.USDCuotaB) ? '0.00' : (USDInversionB * calculator.USDCuotaB).toFixed(2)
                      }
                    </td>
                    <td></td>
                    <td style={dataResult.USDGananciaRealB < 0 ? {backgroundColor: '#FF8383'} : (dataResult.USDGananciaRealB) > 15 ? {backgroundColor: '#59FF5B'} : {backgroundColor: '#FFE278'}}>{isNaN(dataResult.USDGananciaRealB) ? '0.00' : (dataResult.USDGananciaRealB).toFixed(2)}</td>
                    <td>{isNaN(dataResult.USDPorcentajeB) ? '0.00' : (dataResult.USDPorcentajeB).toFixed(9)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
                  
          
        <div className='row'>
          <div className='col-sm-12'>
          <div className='text-center' style={{fontSize: 14, fontWeight: 'bolder', backgroundColor: "#69FFF1"}}>SOLES PERUANOS</div>
            <table style={{width: '100%'}}>
              <thead>
                <tr className='text-center'>
                  <th></th>
                  <th scope="col">Cuota</th>
                  <th scope="col">Inversión</th>
                  <th scope="col">Gan. Pot.</th>
                  <th scope="col"></th>
                  <th scope="col">Gan. Real</th>
                  <th scope="col">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  
                  <td style={{backgroundColor: "#212121", color: '#fff', paddingLeft: 3, paddingRight: 3}}>D</td>
                  <td>{isNaN(dataResult.SOLESCuotaD) ? 0.00 : parseFloat(dataResult.SOLESCuotaD) }</td>
                  <td>{isNaN(dataResult.SOLESInversionD) ? 0.00 : parseFloat(dataResult.SOLESInversionD).toFixed(2) }</td>
                  <td>{isNaN(dataResult.SOLESGananciaPotencialD) ? 0.00 : parseFloat(dataResult.SOLESGananciaPotencialD).toFixed(2) }</td>
                  <td>{isNaN(dataResult.SOLESGananciaPotencialD / dataResult.SOLESCuotaB) ? '0.00' : (dataResult.SOLESGananciaPotencialD / dataResult.SOLESCuotaB).toFixed(2)}</td>
                  <td style={dataResult.SOLESGananciaRealD < 0 ? {backgroundColor: '#FF8383'} : (dataResult.SOLESGananciaRealD) > 15 ? {backgroundColor: '#59FF5B'} : {backgroundColor: '#FFE278'}}>{isNaN(dataResult.SOLESGananciaRealD) ? 0.00 : parseFloat(dataResult.SOLESGananciaRealD).toFixed(2) }</td>
                  <td>{isNaN(dataResult.SOLESPorcentajeD) ? 0.00 : parseFloat(dataResult.SOLESPorcentajeD).toFixed(9) }</td>
                </tr>
                <tr>                  
                  <td style={{backgroundColor: "#212121", color: '#fff', paddingLeft: 3, paddingRight: 3}}>B</td>
                  <td>{dataResult.SOLESCuotaB}</td>
                  <td>{isNaN(dataResult.SOLESInversionB) ? 0.00 : parseFloat(dataResult.SOLESInversionB).toFixed(2) }</td>
                  <td>{isNaN(dataResult.SOLESGananciaPotencialB) ? 0.00 : parseFloat(dataResult.SOLESGananciaPotencialB).toFixed(2) }</td>
                  <td></td>
                  <td style={dataResult.SOLESGananciaRealB < 0 ? {backgroundColor: '#FF8383'} : (dataResult.SOLESGananciaRealB) > 15 ? {backgroundColor: '#59FF5B'} : {backgroundColor: '#FFE278'}}>{isNaN(dataResult.SOLESGananciaRealB) ? 0.00 : parseFloat(dataResult.SOLESGananciaRealB).toFixed(2) }</td>
                  <td>{isNaN(dataResult.SOLESPorcentajeB) ? 0.00 : parseFloat(dataResult.SOLESPorcentajeB).toFixed(9) }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
