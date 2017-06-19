/**
 * @author Flower
 * @description Common Storage
 */

import Util from './Util'
import Auth from './UserAuth'
let Storage = {
  set(name, obj){
    if( typeof obj === 'object' ){
      localStorage.setItem( name, JSON.stringify(obj) );
    }else{
      localStorage.setItem( name, obj );
    }
  },
  get(name){
    return localStorage.getItem(name)?JSON.parse(localStorage.getItem(name)):'';
  }
}

export const SessionStorage = {
  set(name, obj){
    if( typeof obj === 'object' ){
      console.log(obj);
      sessionStorage.setItem( name, JSON.stringify(obj) );
    }else{
      sessionStorage.setItem( name, obj );
    }
  },
  get(name){
    return sessionStorage.getItem(name)?JSON.parse(sessionStorage.getItem(name)):'';
  }
}

export const LocalStorage = {
  set(name, obj){
    if( typeof obj === 'object' ){
      console.log(obj);
      localStorage.setItem( name, JSON.stringify(obj) );
    }else{
      localStorage.setItem( name, obj );
    }
  },
  get(name){
    return localStorage.getItem(name)?JSON.parse(localStorage.getItem(name)):'';
  }
}

export const UserDataStorage = {
  set(name, obj){
    let openId = Auth.getOpenId();
    if( !openId ) return;
    let userData = localStorage.getItem( openId ) || '';
    if( userData ){
      try{
        userData = JSON.parse(userData);
      }catch(e){
        userData = {};
        console.error( 'data transfer error at Storage/UserDataStorage');
      }
    }else{
      userData = {};
    }
    userData[name] = obj;
    localStorage.setItem( openId, JSON.stringify(userData) );
  },
  get(name){
    let openId = Auth.getOpenId();
    if( !openId ) return;
    let userData = localStorage.getItem( openId ) || '';
    if( !userData ) return '';
    try{
      userData = JSON.parse( userData );
    }catch(e){
      userData = {};
      localStorage.setItem( openId, JSON.stringify(userData) );
      console.error( 'data transfer error at Storage/UserDataStorage');
    }
    return userData[name];
  }
}