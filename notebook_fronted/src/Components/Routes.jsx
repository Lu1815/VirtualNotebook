import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import TopicsList from './TopicsList'
import NotesList from './NotesList'

const Routes = () => {
  return (
    <div className='p-4'>
        <Switch>
            <Route exact path='/' element={<TopicsList/>}/>
            <Route exact path='/Notes/:topicId' element={<NotesList/>}/>
        </Switch>
    </div>
  )
}

export default Routes;