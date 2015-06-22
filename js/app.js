


var app = (function(){
	var renderer;
	var camera;
	var scene;
	var controls;

	var renderCube;

	var shaders = {
		screenProjectionVS: null,
		backsideFS: null
	};

	function init(){
		//create objects
		renderer = new THREE.WebGLRenderer();

		camera = new THREE.PerspectiveCamera(50, getDrawAspect() , 0.01, 100);
		scene = new THREE.Scene();
		controls = new THREE.OrbitControls(camera);

		//set properties
		//renderer
		renderer.setSize(getDrawWidth(), getDrawHeight());
		renderer.setClearColor(0x000000);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(getDrawWidth(), getDrawHeight());
		//camera
		camera.position.z = 4.0;
		//controls
		controls.damping = 0.2;
		controls.zoomSpeed = 0.5;
		controls.addEventListener('change', render);

		//register event listeners
		window.addEventListener('resize', onWindowResize, false);

		//get shaders from DOM
		for(var key in shaders){
			if(shaders.hasOwnProperty(key)){
				shaders[key] = document.getElementById(key).textContent;
			}
		}

		//DOM modification
		document.body.appendChild(renderer.domElement);

		//start
		initScene();
		mainLoop();
	}

	function initScene(){
		var shaderMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders.screenProjectionVS,
			fragmentShader: shaders.backsideFS,
			side: THREE.BackSide
		});
		renderCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), shaderMaterial);
		scene.add(renderCube);
	}

	function mainLoop(){
		controls.update();
		render();

		requestAnimationFrame(mainLoop);
	}

	function render(){
		renderer.render(scene, camera);
	}


	//Events
	function onWindowResize(){
		camera.aspect = getDrawAspect();
		camera.updateProjectionMatrix();

		renderer.setSize(getDrawWidth(), getDrawHeight());

		render();
	}

	//
	function getDrawWidth(){
		return window.innerWidth;
	}

	function getDrawHeight(){
		return window.innerHeight;
	}

	function getDrawAspect(){
		return getDrawWidth() / getDrawHeight();
	}

	return {
		init: init
	}

})();

//start
app.init();