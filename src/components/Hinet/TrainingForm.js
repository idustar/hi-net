import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
import {connect} from 'dva';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(state => ({
  job: state.job.job,
}))
class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  training () {
    const {job} = this.props;
    if (job.startTime && (new Date()).valueOf() - job.startTime >= 120000) return;
    if (!job.finishTime && !job.message) {
      this.props.dispatch({
        type: 'job/fetchJob',
        payload: job.id,
      });
      setTimeout(()=>this.training(), 500);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'job/run',
          payload: values,
        });
        console.log('Received values of form: ', values);
        setTimeout(()=>this.training(), 500);
      }
    });

  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const epochsError = isFieldTouched('epochs') && getFieldError('epochs');
    const batchSizeError = isFieldTouched('batchSize') && getFieldError('batchSize');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={epochsError ? 'error' : ''}
          help={epochsError || ''}
        >
          {getFieldDecorator('epochs', {
            rules: [{ required: true, message: 'Please input epochs!' }],
          })(
            <Input prefix={<Icon type="hourglass" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Epochs" />
          )}
        </FormItem>
        <FormItem
          validateStatus={batchSizeError ? 'error' : ''}
          help={batchSizeError || ''}
        >
          {getFieldDecorator('batchSize', {
            rules: [{ required: true, message: 'Please input batch size!' }],
          })(
            <Input prefix={<Icon type="pushpin-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Batch Size" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            icon="code"
            disabled={hasErrors(getFieldsError())}
          >
            Run
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

export default WrappedHorizontalLoginForm;
