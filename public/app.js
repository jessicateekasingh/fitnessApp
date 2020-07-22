class Workout extends React.Component{
    state = {
      show:false
    }



  toggleShow = () => {
      this.setState({
          show:!this.state.show
      })
  }

  render = () => {
    const {workout, deleteWorkout, updateWorkout, updateWorkoutOpt, updateAuthor, updateDes, index} = this.props;
    return <div className="container">

    <div key={index} className="show-page">

    <div className="wrk-info">
    <h2>{workout.author}</h2><br/>
    <h4>{workout.workout}</h4><br/>
    <h3>{workout.des}</h3><br/>
    </div>


    <button className="btns" onClick={this.toggleShow}>EDIT</button>
    <button className="btns" value={workout.id} onClick={deleteWorkout}>DELETE</button>

    </div>

    { this.state.show ?
        <div className="edit-form">
          <form id={workout.id} onSubmit={updateWorkout}>
            <input className="edit-input"  onKeyUp={updateAuthor} type="text" placeholder="Name" required/>
            <input className="edit-input" onKeyUp={updateWorkoutOpt} type="text" placeholder="Cardio, Endurance, Strength" required/>
            <input className="edit-input" onKeyUp={updateDes} type="text" placeholder="New Description" required/>
            <input className="edit-submit" type="submit" value="Update Workout"/>
          </form>
        </div> : null }
        </div>

  }

}

class App extends React.Component{
    state = {
      workouts:[],
      show:false
    }

    toggleShow = () => {
        this.setState({
            show:!this.state.show
        })
    }

    componentDidMount = () => {
        axios.get('/workouts').then(
          (response) => {
            this.setState({
                workouts:response.data
            })
          }
        )
    }

    createWorkout = (event) => {
      event.preventDefault();
      axios.post(
          '/workouts',
          {
            author:this.state.newAuthor,
            workout:this.state.newWorkoutOpt,
            des:this.state.newDes,

          }
      ).then(
        (response) => {
          this.setState({
            workouts:response.data
          })
        }
      )

    }

    createAuthor = (event) => {
      this.setState({
          newAuthor:event.target.value
      })
    }

    createWorkoutOpt = (event) => {
      this.setState({
          newWorkoutOpt:event.target.value
      })
    }


    createDes = (event) => {
      this.setState({
          newDes:event.target.value
      })
    }


    deleteWorkout = (event) => {
        axios.delete('/workouts/' + event.target.value).then(
            (response) => {
              this.setState({
                  workouts:response.data
              })
            }
        )
    }



    updateWorkout = (event) =>{
      event.preventDefault();
      const id = event.target.getAttribute('id');
      axios.put(
        '/workouts/' + id,
        {
          author:this.state.updatedAuthor,
          workout:this.state.updatedWorkoutOpt,
          des:this.state.updatedDes,
        }
      ).then(
        (response) => {
            this.setState({
                workouts:response.data
            })
        }
      )
    }

    updateAuthor = (event) => {
      this.setState({
        updatedAuthor:event.target.value,

      })
    }

    updateWorkoutOpt = (event) => {
      this.setState({
        updatedWorkoutOpt:event.target.value,

      })
    }

    updateDes = (event) => {
      this.setState({
        updatedDes:event.target.value,

      })
    }


  render = () => {
    return <div>
    <nav className="nav-bar"><button onClick={this.toggleShow} className="nav-btns">LIST A WORKOUT</button></nav>

    { this.state.show ?
    <div className="create-form-div">
      <form className="create-form" onSubmit={this.createWorkout}>

       <input className="create-input" onKeyUp={this.createAuthor} type="text" placeholder="Name" required/><br/>
       <input className="create-input" onKeyUp={this.createWorkoutOpt} type="text" placeholder="Cardio, Endurance, Strength.." required/><br/>
       <input className="create-input" onKeyUp={this.createDes} type="text" placeholder="Add Description" required/><br/>
       <input className="create-submit" type="submit" value="Make it WORK"/>
      </form>
    </div> : null}

    {
      this.state.workouts.map(

        (workout,index) => {
          return  <Workout workout={workout}
                       index={index}
                       deleteWorkout={this.deleteWorkout}
                       updateWorkout={this.updateWorkout}
                       updateAuthor={this.updateAuthor}
                       updateWorkoutOpt={this.updateWorkoutOpt}
                       updateDes={this.updateDes}



              ></Workout>
        })

    }

    </div>
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
