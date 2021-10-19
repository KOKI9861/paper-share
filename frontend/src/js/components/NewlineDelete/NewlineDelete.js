import React from "react";

export default class NewlineDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };

    this.deleteMark = this.deleteMark.bind(this)
  }

  deleteMark(event){
    const tragetText = event.target.value;
    const deletedText = tragetText.replace(/([^\.])\r\n/, /$1 /);
    this.setState({text: deletedText})
  }

  render() {
    return (
      <div>
        <label>論文からコピーしたテキストを入力</label><br/>
        <textarea
          rows="4" cols="65"
          placeholder="copy text"
          onChange={this.deleteMark}
        /><br/>
        <label>改行を消したテキスト</label><br/>
        <div>{this.state.text}</div>
      </div>
    );
  }
}