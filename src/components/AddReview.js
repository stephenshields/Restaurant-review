import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Schema for yup
const validationSchema = Yup.object().shape({
  author_name: Yup.string()
  .min(2, "*Names must have at least 2 characters")
  .max(100, "*Names can't be longer than 100 characters")
  .required("*Name is required"),
  text: Yup.string()
  .min(1, "*Names must have at least 1 characters")
  .max(200, "*200 characters Maximum")
  .required("*Review is required"),
  rating: Yup.number()
  .min(1, "*A rating is required")
  .max(5, "*Five is the maximum rating")
  .required("*A rating is required")
});

function AddReview(props) {
  return (
    <div style={{padding: '15px'}}>
      <Formik
        initialValues={{ author_name:"", text:"", rating:""}}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // Simulate submitting to database, shows us values submitted, resets form
            const newReview = values;
            props.fetchReview(newReview);
            console.log(newReview)
            resetForm();
            setSubmitting(false);
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              /* This name property is used to access the value of the form element via values.nameOfElement */
              name="author_name"
              placeholder="Full Name"
              /* Set onChange to handleChange */
              onChange={handleChange}
              /* Set onBlur to handleBlur */
              onBlur={handleBlur}
              /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
              value={values.author_name}
              /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
              className={touched.author_name && errors.author_name ? "error" : null}
              />
              {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
              {touched.author_name && errors.author_name ? (
                <div className="error-message">{errors.author_name}</div>
              ): null}
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Review :</Form.Label>
            <Form.Control
              type="textarea"
              name="text"
              placeholder="Your review..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
              className={touched.text && errors.text ? "error" : null}
              />
              {touched.text && errors.text ? (
                <div className="error-message">{errors.text}</div>
              ): null}
          </Form.Group>
          <Form.Group controlId="formBlog">
            <Form.Label>Rating :</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              placeholder="rating"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rating}
              className={touched.rating && errors.rating ? "error" : null}
              />
              {touched.rating && errors.rating ? (
                <div className="error-message">{errors.rating}</div>
              ): null}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
      </Formik>
    </div>
  );
}


export default AddReview;