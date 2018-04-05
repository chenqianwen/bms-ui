/* eslint-disable linebreak-style,object-curly-spacing,arrow-parens,react/no-unused-state,object-shorthand,array-callback-return,comma-dangle,no-extra-semi,react/jsx-tag-spacing */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb} from '@icedesign/base';
import {Tag} from "@icedesign/base";
import {Link,hashHistory} from 'react-router';
import './CustomBreadcrumb.scss';

export default class CustomBreadcrumb extends Component {
  static displayName = 'CustomBreadcrumb';

  static defaultProps = {
    dataSource: [],
    tagList: []
  };

  static propTypes = {
    dataSource: PropTypes.array,
    tagList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      closed: false
    };
  };

  onClose = (tagName, closed) => {
    console.log(tagName)
    console.log(closed)
    this.deleteTag(tagName)
    const dataSource = this.props.dataSource;
    const currentTagName = dataSource[dataSource.length - 1].text;
    console.log(currentTagName)
    // 如果关闭当前打开的标签，则打开最后一个
    if (currentTagName === tagName) {
      this.deleteTag(tagName);
      hashHistory.push(this.props.tagList[this.props.tagList.length-1].path)
    }
  };

  deleteTag = (tagName) => {
    this.props.tagList.map((item, index) => {
      if (item.tagName === tagName) {
        this.props.tagList.splice(index, 1);
      }
    })
  };

  render() {
    /**
     * 组装数据 和 逻辑判断
     */
    const dataSource = this.props.dataSource;
    const tagList = this.props.tagList;
    // 最终的路由对象
    const targetRouter = dataSource[dataSource.length - 1]
    const tagName = targetRouter.text;
    const path = targetRouter.link;
    // 组装成一个tag对象
    const tagObject = {tagName: tagName, path: path};
    // 判断tag对象，在tagList集合中是否存在，不存在添加进去
    let pushFlag = true;
    tagList.map(item => {
      if (item.tagName === tagName) {
        pushFlag = false;
      }
    })
    if (pushFlag) {
      tagList.push(tagObject);
    }
    return (
      <div className="breadcrumb_class">
        <Breadcrumb style={{margin: 0}}>
          {dataSource.map((item, index) => {
            return (
              <Breadcrumb.Item link={item.link} key={index}>
                {item.text}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <hr/>
        <div className="tag-list-item">
          {tagList.map((item, index) => {
            return (
              <Tag shape="deletable" onClose={this.onClose}
                   value={item.tagName} key={index} type={tagName === item.tagName ? "primary" : "normal"}
                   animation={false}>
                <Link to={item.path}
                      style={{color: tagName === item.tagName ? "white" : "black"}}>{item.tagName}</Link>
              </Tag>
            )
          })}
        </div>
      </div>
    );
  }
}
