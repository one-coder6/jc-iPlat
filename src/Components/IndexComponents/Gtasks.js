
import React,{Component} from 'react';
require('../../styles/index.less');
class TodayCard extends Component{
	constructor(props){
		super(props);
		this.state = {
			//listData:list,
			top:0
		}
	}
	componentDidMount(){
    this.timer&&clearInterval(this.timer);	
		this.handleScroll();
	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
  handleEnter(){
    clearInterval(this.timer);
  }
  handleLeave(){
    this.handleScroll();
  }
  handleScroll(){
    clearInterval(this.timer);
    var ulHeight = this.refs.list.offsetHeight/2;
    var top =Math.abs (parseInt(this.refs.list.style.top));
    this.timer = setInterval(()=>{
    this.setState({
      top:Math.abs(this.state.top)>=ulHeight?-2:this.state.top-2
      })
    },150)
  }
	render(){
		const {WillBeDone}=this.props;
		return (
			<div className='TodayCard gtasksList'>
				<ul className='listWrapper' ref='list' style={{top:this.state.top}} 
          		onMouseEnter={this.handleEnter.bind(this)}
          		onMouseLeave={this.handleLeave.bind(this)}
          	>
					{WillBeDone&&WillBeDone.map(function(item,index){
						return(
						<li key={index}>
		                    - <span>线索{item.thingsId}</span>：{item.thingsDesc}
						</li>	
						)
					})}
				</ul>
			</div>
		)
	}
}


export default TodayCard;

































