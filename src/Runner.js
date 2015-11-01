import React, {Component, PropTypes} from 'react';
import Base from './Base';

const slice = arr => arr.slice();
const compare = (o1, o2, keys) => keys.some(k => o1[k] !== o2[k]);

export default class Runner extends Component {
  static propTypes = {
    initialData: PropTypes.array,
    toColor: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    tick: PropTypes.func,
    refreshRate: PropTypes.number,
    running: PropTypes.bool,
  }

  static defaultProps = {
    initialData: [[]],
    toColor: v => v,
    onClick: () => null,
    onChange: () => null,
    tick: v => v,
    refreshRate: 1000,
    running: true,
  }

  constructor(props) {
    super(props);
    const {initialData: data} = props;
    this.state = {data};
  }

  shouldComponentUpdate(np) {
    const p = this.props;
    if (np.running !== p.running) {
      setTimeout(() => this[np.running ? 'run' : 'stop']());
    } else if (compare(np, p, ['refreshRate', 'tick']) && p.running) {
      setTimeout(() => (this.stop(), this.run()));
    }
    return true;
  }

  componentWillUnmount() {
    this.stop();
  }

  run() {
    const {refreshRate} = this.props;
    const f = () => {
      const {onChange, tick} = this.props;
      let {data, meta} = this.state;
      data = tick(data, meta);
      if (data.data) ({data, meta} = data);
      this.setState({data, meta});
      onChange(data.map(slice), meta);
    };
    f();
    this.interval = setInterval(f, refreshRate);
  }

  stop() {
    clearInterval(this.interval);
  }

  data(data) {
    if (data) { this.setState({data}); return data; }
    return this.state.data.map(slice);
  }

  meta(meta) {
    if (meta) { this.setState({meta}); return meta; }
    return this.state.meta.map(slice);
  }

  render() {
    const {data} = this.state;
    return <Base {...this.props} data={data}/>;
  }
}
