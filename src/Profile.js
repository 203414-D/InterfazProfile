import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile(params) {
    const [url, setUrl]= useState();
    var username=localStorage.getItem('username');
    var firstName=localStorage.getItem('first_name');
    var lastName=localStorage.getItem('last_name');
    var Email=localStorage.getItem('email');
    var user_id=localStorage.getItem('user_id');
    const [fname, setfirstname]= useState();
    const [Lname, setlastname]= useState();
    const [email, setemail]=useState();
    const [Uname, setuname]=useState();

   
    useEffect(()=>{
        document.title='Profile'
    });
    let obtenerImagen = (()=>{
        let token = localStorage.getItem('token')
        console.log(token)
        axios.get('http://localhost:8000/api/v2/user/'+localStorage.getItem('user_id'),{
            headers:{
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        })

        .then((response)=>{
            let urlPro = 'http://localhost:8000'+response.data['url_img']
            setUrl(urlPro)
            console.log(urlPro)
            
        });
    });
    const verificar = (()=>{
        let veri = url
        if (veri !=null) {
            Modificar()
        } else {
            Nueva()
           }
        });
        
        let Nueva = (()=>{
                let datapost = new FormData();
                datapost.append('user_id', localStorage.getItem('user_id'));
                datapost.append('url_img', document.getElementById('img').files[0]);
                axios.post("http://localhost:8000/api/v1/user/", datapost,{
                    headers:{
                        'Content-Type': 'multipart/from-data',
                        'Authorization': 'Token '+localStorage.getItem('token'),
                    }
                })

                .then((response)=>{
                    let urlNew = 'http://localhost:8000'+response.data['url_img']
                    setUrl(urlNew)
                    console.log(urlNew)
                    window.location="/profile/"+localStorage.getItem('user_id')
                })
        });

        let Modificar = (()=>{
                let Putdata = new FormData();
                Putdata.append('user_id', localStorage.getItem('user_id'));
                Putdata.append('url_img', document.getElementById('img').files[0]);
                axios.put("http://localhost:8000/api/v2/user/"+localStorage.getItem('user_id'), Putdata,{
                    headers:{
                        'Content-Type': 'multipart/from-data',
                        'Authorization': 'Token '+localStorage.getItem('token'),
                    }
                })
                .then((response)=>{
                    let urlput = 'http://localhost:8000'+response.data['url_img']
                    setUrl(urlput)
                    console.log(urlput)
                })
                .catch((error)=>{
                    console.log(error)
                    alert("error al ingresar nueva imagem")
                })
        });
        const FiName =(()=>{
            if (fname !== undefined) {
                    localStorage.removeItem('first_name')
                    let PData =  new FormData();
                    PData.append('username', localStorage.getItem('username'));
                    PData.append('email', localStorage.getItem('email'));
                    PData.append('last_name', localStorage.getItem('last_name'));
                    PData.append('first_name', fname);
                    axios.put("http://localhost:8000/api/v1/upd/"+localStorage.getItem('user_id'),PData,{
                        headers:{
                            'Content-Type': 'multipart/from-data',
                            'Authorization': 'Token '+localStorage.getItem('token'),
                        }
                    })
                    .then((response)=>{
                        localStorage.setItem('first_name', response.data.first_name);
                        window.location="/profile/"+localStorage.getItem('user_id')

                    })
            } else {
                alert('No se puede Modificar campo vacio')
            }
        });
        const LAName =(()=>{
            if (Lname !== undefined) {
                    localStorage.removeItem('last_name')
                    let PData =  new FormData();
                    PData.append('username', localStorage.getItem('username'));
                    PData.append('email', localStorage.getItem('email'));
                    PData.append('first_name', localStorage.getItem('first_name'));
                    PData.append('last_name', Lname)
                    axios.put("http://localhost:8000/api/v1/upd/"+localStorage.getItem('user_id'),PData,{
                        headers:{
                            'Content-Type': 'multipart/from-data',
                            'Authorization': 'Token '+localStorage.getItem('token'),
                        }
                    })
                    .then((response)=>{
                        localStorage.setItem('last_name', response.data.last_name);
                        window.location="/profile/"+localStorage.getItem('user_id')

                    })
            } else {
                alert('No se puede Modificar campo vacio')
            }
        });
        const Memail =(()=>{
            if (email !== undefined) {
                    localStorage.removeItem('email')
                    let PData =  new FormData();
                    PData.append('username', localStorage.getItem('username'));
                    PData.append('first_name', localStorage.getItem('first_name'));
                    PData.append('last_name', localStorage.getItem('last_name'));
                    PData.append('email', email);
                    axios.put("http://localhost:8000/api/v1/upd/"+localStorage.getItem('user_id'),PData,{
                        headers:{
                            'Content-Type': 'multipart/from-data',
                            'Authorization': 'Token '+localStorage.getItem('token'),
                        }
                    })
                    .then((response)=>{
                        localStorage.setItem('email', response.data.email);
                        window.location="/profile/"+localStorage.getItem('user_id')

                    })
            } else {
                alert('No se puede Modificar campo vacio')
            }
        });
        const Muser =(()=>{
            if (Uname !== undefined) {
                    localStorage.removeItem('username')
                    let PData =  new FormData();
                    PData.append('username', Uname);
                    PData.append('first_name', localStorage.getItem('first_name'));
                    PData.append('last_name', localStorage.getItem('last_name'));
                    PData.append('email', localStorage.getItem('email'));
                    axios.put("http://localhost:8000/api/v1/upd/"+localStorage.getItem('user_id'),PData,{
                        headers:{
                            'Content-Type': 'multipart/from-data',
                            'Authorization': 'Token '+localStorage.getItem('token'),
                        }
                    })
                    .then((response)=>{
                        localStorage.setItem('username', response.data.username);
                        window.location="/profile/"+localStorage.getItem('user_id')

                    })
            } else {
                alert('No se puede Modificar campo vacio')
            }
        });
    let l=url
    obtenerImagen()
    return(
        <div className="profile">
        <h2>Perfil</h2>
        <div className="image"><img src={l}></img><br></br></div>
        <input accept="image/png,image/jpeg" type="file" id="img"></input>
        <button  onClick={()=>{
                console.log('funcionando')
                verificar()
        }}>nueva foto</button>
        <p id="vacio"></p>
        <p><b>id de usuario: </b>{user_id}</p>
        <label>Username: <input type="text" name="username" placeholder={username}  onChange={e=>setuname(e.target.value)}/></label>
        <button className="modificarB"  onClick={()=>{
                console.log('funcionando')
                Muser()
        }}>Modificar</button>
        <label>Fisrt Name: <input type="text" name="firstname" placeholder={firstName}  onChange={e=>setfirstname(e.target.value)}/></label>
        <button className="modificarB"  onClick={()=>{
                console.log('funcionando')
                FiName()
        }}>Modificar</button>
        <label>Last Name: <input type="text" name="lastname" placeholder={lastName} onChange={e=>setlastname(e.target.value)}/></label>
        <button className="modificarB"  onClick={()=>{
                console.log('funcionando')
                LAName()
        }}>Modificar</button>
       <p> <label>Email: <input type="email" name="correo" placeholder={Email} onChange={e=>setemail(e.target.value)}/></label>
       <button className="modificarB"  onClick={()=>{
                console.log('funcionando')
                Memail()
        }}>Modificar</button>
       </p>
        <Link id="Link-Style" to="/login">volver</Link>
        </div>
        
    );

}
export default Profile