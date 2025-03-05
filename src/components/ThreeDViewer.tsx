import React, { useEffect, useRef } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import { GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import * as THREE from "three";

const ThreeDViewer = () => {
  const modelRef = useRef(null);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (modelRef.current) {
          modelRef.current.rotation.y += gesture.dx * 0.01;
          modelRef.current.rotation.x += gesture.dy * 0.01;
        }
      },
    })
  ).current;

  const onContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const geometry = new THREE.BoxGeometry();
    const texture = new TextureLoader().load(
      "https://threejsfundamentals.org/threejs/resources/images/wall.jpg"
    ); // Example texture
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    modelRef.current = cube;

    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  glView: { flex: 1 },
});

export default ThreeDViewer;
