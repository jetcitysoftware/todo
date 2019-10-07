import React from 'react';
import {connect} from 'react-redux';
import Modal from '../modal';

const Item = (props) => {

  return (
    <Modal title="To Do Item" close={props.hideDetails}>
      <div className="todo-details">
        <header>
          <span>Assigned To: {props.item.assignee}</span>
          <span>Due: {props.item.due}</span>
        </header>
        <div className="item">
          {props.item.text}
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(
  mapStateToProps,
)(Item);
