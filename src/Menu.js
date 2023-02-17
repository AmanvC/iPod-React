function Menu(props){
    const {apps} = props;
    return(
        <div className="menu-screen">
            <h6>iPod.js</h6>
            {apps.map(x => 
                <p className={x} key={x}>{x}</p> )} 
                {/* add active class here {x + " active"} */}
        </div>
    )
}

export default Menu;