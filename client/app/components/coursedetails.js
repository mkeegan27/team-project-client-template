import React from 'react';
import {getCourseData} from '../server'
import {getUserData} from '../server'
import {Link} from 'react-router'
import {haveTaken} from '../server'
import {nextSem} from '../server'


export default class CourseDetails extends React.Component{

  constructor(props){
    super(props);
    this.state = props
  }

  takeNextSemester(){
   nextSem(this.props.route.user, parseInt(this.props.params.course))
 }

 takenAlready(){
   haveTaken(this.props.route.user, parseInt(this.props.params.course))
 }

  render(){

  var data = getCourseData(this.props.params.course);
  var userData = getUserData(this.props.route.user);
  var prereqs = data.prereqs.map(course =>{
    var info = getCourseData(course);
    return (info.department + " " + info.number + ": " + info.name);
  });

  if (prereqs.length == 0){
    prereqs = "None."
  }

  var takentext = "Eligible"

  data.prereqs.map(course => {
    if(userData.classesTaken.indexOf(course) == -1){
      takentext = "Ineligible: must take " + prereqs[0];
    }
  })

  userData.classesTaken.map(course =>{
    if(course == this.props.params.course){
      takentext = "Taken"
    }
  });
  userData.nextSemester.map(course =>{
    if(course == this.props.params.course){
      takentext = "Next Semester"
    }
  });

    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-md-10 col-md-offset-1">
            <div className = "panel">
              <div className = "panel-heading">
                <div className = "media">
                  <div className = "media-body">
                    <h1>
                      <strong>{data.department + " " + data.number}:</strong> {data.name}
                    </h1>
                    <h4>
                      <strong>Status: </strong>{takentext}
                    </h4>
                    <button type = "button" className = "btn btn-default" onClick={this.takeNextSemester.bind(this)}>
                      I'll take this next semester!
                    </button>

                    <button type = "button" className = "btn btn-default" onClick={this.takenAlready.bind(this)}>
                      I took this class!
                    </button>

                  </div>
                  <div className = "media-right media-middle">
                    <img className = "media-object" src = "img/CS326.png" alt="CS326" />
                  </div>
                </div>
              </div>
              <hr />
              <div className = "panel-body">
                <h3>Description</h3>
                <p>{data.description}</p>
                <h3>Textbooks</h3>
                <p>{data.textbooks}</p>
                <h3>Prerequisites</h3>
                <p>{prereqs.toString()}</p>
                <br />
                <hr />
                <div className = "col-md-3">
                  <h4>Similar classes...</h4>
                  <p>Here are some other classes you might be interested in taking.</p>
                </div>
                <div className = "col-md-3 suggested">
                  <Link to={"/course/1"}>
                  <button type = "button" className = "btn btn-default">
                    <img className = "center-block" src = "img/CS326.png" alt="CS326" />
                    Web Programming
                  </button>
                </Link>
                </div>
                <div className = "col-md-3 suggested">
                  <Link to={"/course/1"}>
                  <button type = "button" className = "btn btn-default">
                    <img className = "center-block" src = "img/CS326.png" alt="CS326" />
                    Web Programming
                  </button>
                  </Link>
                </div>
                <div className = "col-md-3 suggested">
                  <Link to={"/course/1"}>
                  <button type = "button" className = "btn btn-default">
                    <img className = "center-block" src = "img/CS326.png" alt="CS326" />
                    Web Programming
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}