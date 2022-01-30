import React, { useState } from 'react'
import axios from 'axios'

const Form = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    message: '',
  })
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      })
      setInputs({
        email: '',
        name: '',
        message: '',
      })
    } else {
      setStatus({
        info: { error: true, msg: msg },
      })
    }
  }
  const handleOnChange = (e) => {
    e.persist()
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    })
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }))
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/xgedoqwn',
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.'
        )
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
  }
  return (
    <main>
      <form onSubmit={handleOnSubmit} className="form">
        
        <div className="row two">
            <div className="input">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="name"
                  name="_name"
                  onChange={handleOnChange}
                  placeholder="Name"
                  required
                  value={inputs.name}
                />
            </div>
            
            <div className="input">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="_replyto"
                  onChange={handleOnChange}
                  placeholder="Email"
                  required
                  value={inputs.email}
                />
            </div>
        </div>

        <div className="row one">
            <div className="input">
                <label htmlFor="message">Message</label>
                <textarea
                id="message"
                name="message"
                onChange={handleOnChange}
                placeholder="How can I help you?"
                required
                value={inputs.message}
                />
            </div>
        </div>

        <button type="submit" disabled={status.submitting}>
          {!status.submitting
            ? !status.submitted
              ? 'Submit'
              : 'Submitted'
            : 'Submitting...'}
        </button>
      </form>
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
    </main>
  )
}

export default Form