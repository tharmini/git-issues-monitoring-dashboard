import React from 'react';
import './../style.css';

class Popup extends React.Component {
  render() {
return (
<div className='popup'>
<div className='popup\_inner'>
<button onClick={this.props.closePopup}>close</button>

<h1>{this.props.text}</h1>
</div>
</div>
);
}
}

export default Popup;