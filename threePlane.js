function init(){
  var scene=new THREE.Scene();

  var camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.x=20.0;
  camera.position.y=500;
  // camera.position.z=20;

  var renderer=new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xf6f8fa));
  renderer.setSize(window.innerWidth,window.innerHeight);
  // renderer.setSize(document.body.clientWidth,window.innerHeight);

  var boxGeom=new THREE.BoxGeometry(300,300,300);
  var boxMat=new THREE.MeshNormalMaterial();
  var box=new THREE.Mesh(boxGeom,boxMat);
  scene.add(box);
  box.position.y=150;
  camera.lookAt(new THREE.Vector3(0,0,0));

  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  onwindowResize();
  window.addEventListener('resize',onwindowResize,false);


  let rot = 0; // 角度
let mouseX = 0; // マウス座標

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
});


  render();


  function render(){
    // マウスの位置に応じて角度を設定
  // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
  const targetRot = (mouseX / window.innerWidth) * 360;
  // イージングの公式を用いて滑らかにする
  // 値 += (目標値 - 現在の値) * 減速値
  rot += (targetRot - rot) * 0.02;

  // ラジアンに変換する
  const radian = rot * Math.PI / 180;
  // 角度に応じてカメラの位置を設定
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);
  // 原点方向を見つめる
  camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene,camera);
    requestAnimationFrame(render);
  }

  function onwindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setSize(document.body.clientWidth,window.innerHeight);
  }

}

window.onload=init;
