function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
     
            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
   
                <div class="card shadow p-2 border-top-rounded border-bottom-rounded">

                    <div class="card-header text-center bg-white">
                        <div class="row">
                            <div class="col-12">

                                <img src="./favicon.png" width="100" height="100">                            
                         
                               
                            </div>    
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <form class="" id="frmLogin" autocomplete="off">
                            <div class="form-group">
                                <select class="negrita form-control" id="cmbSucursal">
                                    
                                </select>
                                
                            </div>
                            <div class="form-group">
                                
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-user"></i>
                                        </span>
                                    </div>
                                    <input class="form-control" type="text" id="txtUser" placeholder="Escriba su usuario" required="true">
                                </div>
                                
                            </div>

                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-lock"></i>
                                        </span>
                                    </div>
                                    <input class="form-control" type="password" id="txtPass" placeholder="Escriba su contraseña" required="true">
                                </div>
                                        
                            </div>

                            <br>
                            <div class="form-group" align="right">
                                <button class="btn btn-info btn-xl shadow btn-circle"  type="submit" id="btnIniciar">
                                    <i class="fal fa-unlock"></i>  
                                </button>
                            </div>

                            <div class="form-group" align="right">  
                                <small class="text-secondary">v1.0</small>
                                <br>
                                <small>
                                    <!--
                                    <a href="https://apigen.whatsapp.com/send?phone=50257255092&text=Ayudame%20con%20la%20app%20de%20Mercados%20Efectivos...%20">
                                        por Alexis Burgos
                                    </a>
                                    -->
                                </small>
                            </div>
                        </form>
                    </div>

                
    

                </div>
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4"></div>

            
     
            `
        }
    };

    root.innerHTML = view.login();
};



function addListeners(){
    
      
    let frmLogin = document.getElementById('frmLogin');
    let btnIniciar = document.getElementById('btnIniciar');
    frmLogin.addEventListener('submit',(e)=>{
        e.preventDefault();

        almacenarCredenciales();

        btnIniciar.innerHTML = '<i class="fal fa-unlock fa-spin"></i>';
        btnIniciar.disabled = true;
        apigen.empleadosLogin(frmLogin.cmbSucursal.value,frmLogin.txtUser.value.trim(),frmLogin.txtPass.value.trim())
        .then(()=>{
            //document.body.requestFullscreen();
            //por lo visto se deshabilitan las scroll bars en fullscreen
            selectDateDownload();
        })
        .catch(()=>{
            btnIniciar.disabled = false;
            btnIniciar.innerHTML = '<i class="fal fa-unlock"></i>'
        });
    });


    //carga las sucursales directamente desde código
    document.getElementById('cmbSucursal').innerHTML = '<option value="" disabled selected hidden>Selecciona una sede</option>' + funciones.getComboSucursales();

    selectDateDownload() //carga la info inicial
    .then(()=>{
        try {
            document.getElementById('cmbSucursal').value = GlobalCodSucursal;
            console.log(GlobalCodSucursal);
        } catch (error) {
            console.log('error al cargar sucursal')
            console.log(error)
        }
    })
   
  
};


function InicializarVista(){
   getView();
   addListeners();

   //getCredenciales();
 

};


async function almacenarCredenciales(){
    const cred = new PasswordCredential({
        id: document.getElementById('txtUser').value,
        name: document.getElementById('cmbSucursal').value,
        password: document.getElementById('txtPass').value
    })

    await navigator.credentials.store(cred)

};

function getCredenciales(){
   if ('credentials' in navigator) {
  navigator.credentials.get({password: true})
  .then(function(creds) {

      console.log(creds);
    //Do something with the credentials.
    document.getElementById('txtUser').value = creds.id;
    document.getElementById('cmbSucursal').value = creds.name;
    document.getElementById('txtPass').value = creds.password;

  });
    } else {
    //Handle sign-in the way you did before.
    };
}