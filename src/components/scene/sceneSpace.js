import * as THREE from 'three';
/* import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Mountains from "./src/Mountains4.glb"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Elastic } from 'gsap';


const sceneSpace = () => {

    const canvas = document.querySelector('.webGlScene')
    
    // scene setup
    const scene = new THREE.Scene();
    
    
    const size = {
        width :  window.innerWidth,
        height : window.innerHeight
    }
    
    window.addEventListener ('resize', () => {
        size.width = window.innerWidth
        size.height = window.innerHeight
    
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()

        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })




    // Base camera
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
    camera.position.z = 1
    camera.position.y = 1

    scene.add(camera)



    // renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        /* alpha:true */
    });
    
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.physicallyCorrectLights = true;
 /*       renderer.outputEncoding = THREE.sRGBEncoding */



    const cursor = {
        x: 0,
        y: 0
    }
    
    window.addEventListener("mousemove", ( e ) => {
        cursor.x =   e.x / size.width * 0.5
        cursor.y = -(e.y / size.height * 0.5)
    } )
    



    /* scene gltf */
    let sceneMountains
    let mixer = null
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load(
        Mountains,
        (gltf) =>
        {
            sceneMountains= gltf.scene
            scene.add(sceneMountains)
            sceneMountains.position.set(0,-.95,-5)
            sceneMountains.scale.set(.3,.3,.3)


            mixer = new THREE.AnimationMixer(gltf.scene)
            const action = mixer.clipAction(gltf.animations[0])
            action.setEffectiveTimeScale(3);
            action.play()
        }
    )


    /* lights */



        /* light top */
    const pointLight = new THREE.PointLight( 0x9950FF, 48, 4 );
    pointLight.position.set(0,-.58,0)
    scene.add( pointLight );

        /*light top-center  */
    const pointLight4 = new THREE.PointLight( 0xA768FF, 40, 1.8);
    pointLight4.position.set(1,-.4, -1.8)
    scene.add( pointLight4 );
         


    /* light center */

            /* light center button  */

    const pointLight2 = new THREE.PointLight( 0x503477,0 ,1.5);
    pointLight2.position.set(0,.2,-4.9)
    scene.add( pointLight2 );

            /* light center top  */

    const pointLight6 = new THREE.PointLight( 0xA768FF,0 ,2.3);
    pointLight6.position.set(0,-.5,-6)
    scene.add( pointLight6 );


    const pointLight5 = new THREE.PointLight( 0xA768FF,0 ,2.4);
    pointLight5.position.set(1.5,1,-6)
    scene.add( pointLight5 );


    /* light bottom */

    const pointLight3 = new THREE.PointLight( 0xAf76FF, 0 );
    pointLight3.position.set(0,-.2,-11)
    scene.add( pointLight3 );



    /* animate */
         
    let setLight2 = false
    let setLight3 = false


    const movementScroll = () => {


        
        gsap.registerPlugin(ScrollTrigger);

        const link_button1 = document.querySelector(".link_button1")
        const link_button2 = document.querySelector(".link_button2")
        const link_button3 = document.querySelector(".link_button3")


        link_button1.addEventListener("click", () => {
            gsap.to(camera.position , {
                z:1,
                duration: 1.2,
                ease: Elastic

            })
            setLight2 = false
            setLight3 = false

            gsap.to(pointLight2 , {
                intensity: 0  ,
                duration: 1,
                ease: Elastic
            })
            gsap.to(pointLight3 , {
                intensity: 0  ,
                duration: 1,
                ease: Elastic
            })

            gsap.to(pointLight6 , {
                intensity: 0  ,
                duration: 1,
                ease: Elastic
            })

            gsap.to(pointLight5 , {
                intensity: 0  ,
                duration: 1,
                ease: Elastic
            })
        })



        link_button2.addEventListener("click", () => {


            const tl_button2 = gsap.timeline({
                ease: Elastic,
            })


            tl_button2.to(camera.position , {
                z: -4.1,
                duration: 1.6,
                ease: Elastic
            })

            if ( setLight2 === false){
                tl_button2.to(pointLight6 , {
                    intensity: 20  ,
                    duration: .6,
                    ease: Elastic
                }).add(tl_button2.to(pointLight2 , {
                    intensity: 40  ,
                    duration: .6,
                    ease: Elastic
                }), "-=0.7")

                tl_button2.to(pointLight5 , {
                    intensity: 10 ,
                    duration: 1,
                    ease: Elastic
                })
        
                setLight2 = true
                setLight3 = false

                gsap.to(pointLight3 , {
                    intensity: 0  ,
                    duration: 1,
                    ease: Elastic
                })

     
            }else{
                tl_button2.to(pointLight2 , {
                    intensity: 0  ,
                    duration: 1,
                    ease: Elastic
                })
            }

    
        })

        link_button3.addEventListener("click", () => {

            const tl_button3 = gsap.timeline({
                ease: Elastic,
            })

            tl_button3.to(camera.position , {
                z: -8,
                duration: 1.2,
                ease: Elastic
            })

            if ( setLight3 === false){
                tl_button3.to(pointLight3 , {
                    intensity: 40  ,
                    duration: 1,
                    ease: Elastic
                })
                setLight3 = true
                setLight2 = false

                gsap.to(pointLight2 , {
                    intensity: 0  ,
                    duration: 1,
                    ease: Elastic
                })
                gsap.to(pointLight6 , {
                    intensity: 0  ,
                    duration: 1,
                    ease: Elastic
                })

                gsap.to(pointLight5, {
                    intensity: 0  ,
                    duration: 1,
                    ease: Elastic
                })
            }else{
                tl_button3.to(pointLight3 , {
                    intensity: 0  ,
                    duration: 1,
                    ease: Elastic
                })
            }
    
        })
    }
    
    movementScroll()



    const clock = new THREE.Clock()

    const animate = () =>{

        const time = clock.getElapsedTime()
        const ghost1Angle = time 

        renderer.render(scene,camera)
        window.requestAnimationFrame(animate)
        renderer.autoClear = true
        /* controls.update() */

        camera.position.y = cursor.y * .3
        camera.position.x = cursor.x * .3

        pointLight.position.x = Math.cos(ghost1Angle ) -3
        pointLight2.position.x = -Math.sin(ghost1Angle ) *.5

        pointLight3.position.x = Math.sin(ghost1Angle ) 
        pointLight4.position.x = (Math.sin(ghost1Angle ) + .5) * -.4
        pointLight6.position.x = (Math.cos(ghost1Angle ) ) * -.2

        if(mixer)
        {
            mixer.update(clock.getDelta() *6)
        }
    }
    
    animate()
    
    renderer.render(scene,camera)
        
}

export default sceneSpace;