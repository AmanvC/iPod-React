import React from 'react';
import './App.css';
import * as faIcons from 'react-icons/ai';
import Menu from './Menu';
import Music from './Music';
import Games from './Games';
import Images from './Images';
import Settings from './Settings';
import ZingTouch from 'zingtouch';

class App extends React.Component{
  constructor(){
    super();
    this.menu = false;
    this.state = {
      apps: [ "Music", "Games", "Images", "Settings" ],
      display: "Menu"
    }
  }

  menuClick = () => {
    this.setState({
      display: "Menu"
    })
  }

  appOpen = () => {
    const activeElement = document.querySelector('.active');
    if(activeElement){
      this.setState({
        display: activeElement.classList[0]
      })
    }
  }

  rotateEvent = () => {
    if(this.state.display !== "Menu"){
      return;
    }
    const containerElement = document.querySelector('.controls');
    const activeRegion = ZingTouch.Region(containerElement);
    let current = 0;
    let index = 0;
    let previous = 0;
    let options = document.querySelectorAll('.menu-screen p');
    let clockwise = true;
    activeRegion.bind(containerElement, 'rotate', function(event){
      current = event.detail.distanceFromOrigin;
      if(current === 0){
        previous = 0;
      }else{
        if(previous <= current){
          clockwise = true;
        }else{
          clockwise = false;
        }
      }
      
      if(clockwise && current - previous >= 40){
        if(index === options.length){
          index = 0;
        }
        options[index].classList.add('active');
        previous = current;
        if(index === 0){
          options[options.length-1].classList.remove('active');
        }else{
          options[index-1].classList.remove('active')
        }
        index++;
      }else if(!clockwise && previous - current >= 40){
        index--;
        if(index === -1){
          index = options.length-1;
        }
        options[index].classList.add('active');
        previous = current;
        if(index === options.length-1){
          options[0].classList.remove('active');
        }else{
          options[index+1].classList.remove('active')
        }
      }
    })
  }

  componentDidUpdate(){
    this.rotateEvent();
  }

  componentDidMount(){
    this.rotateEvent();
  }

  render(){
    const {apps} = this.state;
    return(
      <div className="container" >
        <div className="ipod">
          <div className="screen">
          { this.state.display === "Menu" && <Menu apps={apps}/>}
          { this.state.display === "Music" && <Music />}
          { this.state.display === "Games" && <Games />}
          { this.state.display === "Images" && <Images />}
          { this.state.display === "Settings" && <Settings />}
            
          </div>
          <div className="controls" onClick={this.test}>
            <span className="menu-icon" onClick={this.menuClick} style={{fontWeight: 600}}>MENU</span>
            <span className="fast-forward-icon" style={{fontSize: 20}}><faIcons.AiOutlineFastForward /></span>
            <span className="pause-icon" style={{fontSize: 20}}><faIcons.AiOutlinePause /></span>
            <span className="fast-backward-icon" style={{fontSize: 20}}><faIcons.AiOutlineFastBackward /></span>
            <div className="centre-button" onClick={this.appOpen}></div>
          </div>
        </div>


        <div className="ipod">
          <div className="screen">

          </div>
          <div className="controls">
            <span className="menu-icon">MENU</span>
            <span className="fast-forward-icon" style={{fontSize: 20}}><faIcons.AiOutlineFastForward /></span>
            <span className="pause-icon" style={{fontSize: 20}}><faIcons.AiOutlinePause /></span>
            <span className="fast-backward-icon" style={{fontSize: 20}}><faIcons.AiOutlineFastBackward /></span>
            <div className="centre-button"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;