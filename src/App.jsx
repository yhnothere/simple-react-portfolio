import { ContactShadows, Environment, Float, Html, PresentationControls, Text, useGLTF } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import * as THREE from 'three'

export default function Experience() {
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')
    const { camera } = useThree()
    const [isZoomed, setIsZoomed] = useState(false)
    const targetPosition = useRef(new THREE.Vector3())
    const targetLookAt = useRef(new THREE.Vector3())
    const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
    const defaultPosition = new THREE.Vector3(0, 0, 5)
    const zoomedPosition = new THREE.Vector3(0, 0.5, 2)
    const screenLookAt = new THREE.Vector3(0, 0.8, -1)
    const defaultLookAt = new THREE.Vector3(0, 0, 0)
    useFrame((state, delta) => {
        if (isZoomed) {
            targetPosition.current.copy(zoomedPosition)
            targetLookAt.current.copy(screenLookAt)
        } else {
            targetPosition.current.copy(defaultPosition)
            targetLookAt.current.copy(defaultLookAt)
        }
        camera.position.lerp(targetPosition.current, delta * 2)
        currentLookAt.current.lerp(targetLookAt.current, delta * 2)
        camera.lookAt(currentLookAt.current)
    })
    const handleScreenClick = () => { setIsZoomed(!isZoomed) }
    return <>
        <Environment preset="city" />
        <color args={ ['#1d1d1d'] } attach="background" />
        <PresentationControls 
            global 
            rotation={ [0.13, 0.1, 0] }
            polar={ [-0.4, 0.2] }
            azimuth={ [-1, 0.75] }
            damping={ 0.1 }
            snap
            enabled={ !isZoomed }
        >
            <Float 
                rotationIntensity={ 0.4 }
                enabled={ !isZoomed }
            >
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#c3d0ff' }
                    rotation={ [ -0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, -1.15 ] }
                />
                <primitive 
                    object={ computer.scene } 
                    position-y={ -1.2 }
                >
                    <Html 
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={ 1.17 }
                        position={ [ 0, 1.56, -1.4 ] }
                        rotation-x={ -0.256 }
                        occlude
                    >
                        <div 
                            onClick={ handleScreenClick }
                            style={{
                                position: 'relative',
                                width: '1024px',
                                height: '670px',
                                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                                overflow: 'hidden'
                            }}
                        >
                            <iframe 
                                src="https://yhnothere.github.io/simple-html-portfolio/" 
                                style={{
                                    pointerEvents: isZoomed ? 'auto' : 'none',
                                    width: '1024px',
                                    height: '670px',
                                    border: 'none',
                                    background: 'white'
                                }}
                            />
                            {!isZoomed && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                    pointerEvents: 'none'
                                }}
                                onMouseEnter={ (e) => e.currentTarget.style.opacity = '1' }
                                onMouseLeave={ (e) => e.currentTarget.style.opacity = '0' }
                                >
                                    🔍 Click to Zoom
                                </div>
                            )}
                        </div>
                    </Html>
                </primitive>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={ 1 }    
                    position={ [ 2, 0.75, 0.75 ] }
                    rotation-y={ -1.25 }
                    maxWidth={ 2 }
                    textAlign='center'
                    color="#dddddd"
                >
                    YH
                </Text>
            </Float>
        </PresentationControls>
        <ContactShadows 
            position-y={ -1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />
        {!isZoomed && (
            <Html fullscreen>
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'monospace',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    pointerEvents: 'none'
                }}>
                    Click on the screen to zoom in
                </div>
            </Html>
        )}
        {isZoomed && (
            <Html fullscreen>
                <button 
                    onClick={handleScreenClick}
                    style={{
                        position: 'absolute',
                        top: '30px',
                        left: '30px',
                        color: 'white',
                        fontSize: '16px',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '12px 24px',
                        borderRadius: '5px',
                        border: '2px solid white',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        zIndex: 1000
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = 'black';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
                        e.currentTarget.style.color = 'white';
                    }}
                >
                    ← BACK
                </button>
            </Html>
        )}
    </>
}