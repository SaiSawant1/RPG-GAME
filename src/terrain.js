import * as THREE from "three";
export class Terrain extends THREE.Mesh {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.treeCount = 10;

    this.CreateTerrain();

    this.CreateTrees();
  }

  CreateTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
      this.remove(this.terrain);
    }
    const terriaMaterial = new THREE.MeshStandardMaterial({
      color: 0x50a000,
      wireframe: true,
    });
    const terrainGeometry = new THREE.PlaneGeometry(
      this.width,
      this.height,
      this.width,
      this.height,
    );

    this.terrain = new THREE.Mesh(terrainGeometry, terriaMaterial);

    this.terrain.rotation.x = -Math.PI / 2;
    this.terrain.position.set(this.width / 2, 0, this.height / 2);
    this.add(this.terrain);
  }

  CreateTrees() {
    const treeheight = 1;
    const treeRadius = 0.2;
    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeheight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: 0x305010,
      flatShading: true,
    });
    this.trees = new THREE.Group();
    this.add(this.trees);
    this.trees.clear();
    for (let i = 0; i < this.treeCount; i++) {
      const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
      treeMesh.position.set(
        Math.floor(this.width * Math.random()) + 0.5,
        treeheight / 2,
        Math.floor(this.height * Math.random()) + 0.5,
      );
      this.trees.add(treeMesh);
    }
  }
}
