import {Form, Icon, Input, Button, Upload, message} from 'antd';
import {hadoopUrl} from '../../services/config';

const FormItem = Form.Item;
import {connect} from 'dva';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(state => ({
  workspaceId: state.model.model.workspaceId,
}))
class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: null,
      fileList: [],
      uploading: false,
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
  }

  onChange = (e) => {
    this.setState({
      name: e.target.value,
    })
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
        setTimeout(() => this.training(), 500);
      }
    });

  }

  render() {
    const myprops = {
      name: 'content',
      action: `${hadoopUrl}/dataset`,
      data: (file) => {
        return {
          workspaceId: this.props.workspaceId,
          name: this.state.name,
          content: file,
        }
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    const {uploading} = this.state;
    return (
      <div>
        <Input placeholder='Name' onChange={this.onChange}/>
        <Upload {...myprops}>
          <Button>
            <Icon type="upload"/> Click to Upload Dataset
          </Button>
        </Upload>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = HorizontalLoginForm;

export default WrappedHorizontalLoginForm;
