// @ts-nocheck
import { resaltaSiEstasEn } from "./resaltaSiEstasEn.js"
import { MdNavigationDrawer } from "MdNavigationDrawer.js"

export class NavDrw extends MdNavigationDrawer {

 /**
  * @override
  */
 getHipervinculos() {
  return /* HTML */`
   <h1>PWA con MD</h1>

   <a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
    <span class="material-symbols-outlined">help</span>
    Ayuda
   </a>`
 }

}



customElements.define("nav-drw", NavDrw)
