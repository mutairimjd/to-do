import React, { Component } from 'react';
import '../Reset.css';
import '../App.scss';
import { connect } from 'react-redux';
import { completeToDo } from '../actions';

class ListItem extends Component {
    completeClick = completeTodoId => {
        const { completeToDo } = this.props;
        completeToDo(completeTodoId);
    };
    render() {
        const { todoId, todo } = this.props;
        return (
            <div key="toDoName" className="col s10 offset-s1 to-do-list-item black">
                <div className="item">
                    <i className={"far fa-circle"}></i>
                    {todo.title}
                    <span
                        onClick={() => this.completeClick(todoId)}
                        className="complete-todo-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
                    >
                        <i className="large material-icons">Done</i>
                    </span>
                    <div className="rightButtons">
                        <i class="fas fa-pencil-alt" onClick={this.props.editTask}></i>
                        <i class="fas fa-times-circle" onClick={this.props.deleteTask} ></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { completeToDo })(ListItem);