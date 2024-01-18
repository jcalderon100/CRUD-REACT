import './App.css';
import { useState } from "react"; //
import Axios from "axios"; //libreria js para realizar peticiones
import 'bootstrap/dist/css/bootstrap.min.css'; //Framework CSS
import Swal from 'sweetalert2'



function App() {
  // gestion de resultados  
  const [nombre, setNombre] = useState (""); //
  const [edad, setEdad] = useState ();
  const [pais, setPais] = useState ("");
  const [cargo, setCargo] = useState ("");
  const [anios, setAnios] = useState ();
  const [id, setId] = useState ();

  const [editar, setEditar] = useState (false);

  const [empleadosList,setEmpleados]= useState ([]); //lista vacia

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then (()=>{  //luego de enviar los datos ejecutar la siguiente instruccion generar una alerta
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong> Registro exitoso!! </strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con exito!</i>",
        icon: 'success',
        timer: 3000,
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro registrar al empleado!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    })
  }


  const editarEmpleado =(val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);

  }

  //asigacion de datos en 
  const getEmpleados =()=> {
    Axios.get("http://localhost:3001/empleados").then((response)=>{ //cuando se tenga la respuesta almacenar la informacion en response
      setEmpleados(response.data); //asignar los datos 
    });
  }



  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then (()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong> Actualización exitosa!! </strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con exito!</i>",
        icon: 'success',
        timer: 3000,
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro actualizar el empleado!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    })
  }
  

  const deleteEmpleado = (val)=>{

    Swal.fire({
      title: "Confirmar eliminado?",
      html: "<i>Realmente desea elimnar a <strong>"+val.nombre+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {

        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then (()=>{
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado!",
              text: val.nombre + ' fue eliminado',
              icon: "success",
              timer: 3000,
              });
            }).catch(function(error){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logro eliminar el empleado!",
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
              });
            })
            ;
        
        }
    });

  }

  //borra los espacios una vez que se le de clic a los botones de registrar o actualizar 
  const limpiarCampos = () =>{
      setEditar(false);

      setNombre("");
      setEdad("");
      setCargo("");
      setPais("");
      setAnios("");
      setId("");
  }
  

  return (
    
    <div className="container">

        <div className="card text-center">
      <div className="card-header">
        GESTION DE EMPLEADOS
      </div>
      <div className="card-body">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre:</span>
        <input type="text" onChange={(Event)=>{ //event maneja la informacion en el campo capturado
            setNombre(Event.target.value) // valor se asigna al campo setNombre
          }} className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1">
        </input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Edad:</span>
        <input type="Number" onChange={(Event)=>{
            setEdad(Event.target.value)
          }} className="form-control" value={edad} placeholder="Ingrese Edad" aria-label="Username" aria-describedby="basic-addon1">
        </input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Pais:</span>
        <input type="text" onChange={(Event)=>{
            setPais(Event.target.value)
          }} className="form-control" value={pais} placeholder="Ingrese Pais" aria-label="Username" aria-describedby="basic-addon1">
        </input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Cargo:</span>
        <input type="text" onChange={(Event)=>{
            setCargo(Event.target.value)
          }} className="form-control" value={cargo} placeholder="Ingrese su Cargo" aria-label="Username" aria-describedby="basic-addon1">
        </input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
        <input type="number" onChange={(Event)=>{
            setAnios(Event.target.value)
          }} className="form-control"  value={anios} placeholder="Ingrese años Trabajados" aria-label="Username" aria-describedby="basic-addon1">
        </input>
      </div>

    
        <div className="card-footer text-muted">

           {
              editar?
              <div>

              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 

              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>

              </div>
              :<button className='btn btn-success' onClick={add}>Registrar</button>
            }
          
        </div>

        </div>
      </div>

      <button className='btn btn-warning m-2' onClick={getEmpleados}>Registros</button>

      <table className="table table-striped">
            <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
            
          </tr> 
          
        </thead>
        <tbody>
         {
            empleadosList.map((val,key) => {
            return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">

                        <button type="button" 
                        onClick={(Event)=>{
                          editarEmpleado(val);
                        }}
                        className="btn btn-info">Editar</button>

                        <button type="button" onClick={()=> {
                        deleteEmpleado(val);
                        }}
                        className="btn btn-danger">Eliminar</button>

                      </div>
                      </td>
                  </tr>
              })
         }
        </tbody>
      </table>
    </div>
  );

}

export default App;
