import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [nombre, setNombre] = useState ("");
  const [edad, setEdad] = useState ();
  const [pais, setPais] = useState ("");
  const [cargo, setCargo] = useState ("");
  const [anios, setAnios] = useState ();
  const [id, setId] = useState ();

  const [editar, setEditar] = useState (false);

  const [empleadosList,setEmpleados]= useState ([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then (()=>{
      getEmpleados();
      alert("empleado registrado")
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
    });
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

  const getEmpleados =()=> {
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });

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
        <input type="text" onChange={(Event)=>{
            setNombre(Event.target.value)
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

         

          <button className='btn btn-success' onClick={add}>Registrar</button>

        </div>

  
        </div>
      </div>


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
            
          </tr> {}
          
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
                        <button type="button" className="btn btn-danger">Eliminar</button>
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
