function init(){
  var scene=new THREE.Scene();

  var camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.x=20.0;
  camera.position.y=30;
  camera.position.z=20;

  var renderer=new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x884444));
  renderer.setSize(window.innerWidth,window.innerHeight);

  var boxGeom=new THREE.BoxGeometry(4,4,4);
  var boxMat=new THREE.MeshNormalMaterial();
  var box=new THREE.Mesh(boxGeom,boxMat);
  scene.add(box);
  camera.lookAt(box.position);

  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  onwindowResize();
  window.addEventListener('resize',onwindowResize,false);

  var speed=1;
  var rightFlag=true;

  render();


  function render(){
    if(camera.position.x>50&&rightFlag){
      speed*=-1;
      rightFlag=false;
    }
    if(camera.position.x<-50&&!rightFlag){
      speed*=-1;
      rightFlag=true;
    }
    console.log(camera.position.x);
    console.log(rightFlag);

    camera.position.x+=speed;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
  }

  function onwindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  }

}

window.onload=init;
