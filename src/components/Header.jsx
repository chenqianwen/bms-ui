import React, {PureComponent} from 'react';
import {Balloon, Icon} from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import {Link} from 'react-router';
import {headerNavs} from '../navs';
import Logo from './Logo';

export default class Header extends PureComponent {
  render() {
    const {width, theme, selectedKeys,isMobile, className, style, ...others} = this.props;

    return (
      <Layout.Header
        {...others}
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{...style, width}}
      >
        <Logo/>
        <div
          className="ice-design-layout-header-menu"
          style={{display: 'flex'}}
        >
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" defaultSelectedKeys={selectedKeys}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                // 打开新的页面
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    <Link {...linkProps}>
                      {nav.icon ? (
                        <Icon type={nav.icon} size="small"/>
                        // <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}
                      {!isMobile ? nav.text : null}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧个人数据 */}
          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src="https://images.unsplash.com/photo-1490426951762-7df2e77e568a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5519e2265996c14edbae39603026a40c&auto=format&fit=crop&w=500&q=60"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{fontSize: '13px'}}>
                    淘小宝
                  </span>
                  <br/>
                  <span
                    className="user-department"
                    style={{fontSize: '12px'}}
                  >
                    技术部
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            {/* 气泡提示的内容 */}
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/">
                  <FoundationSymbol type="person" size="small"/>我的主页
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/">
                  <FoundationSymbol type="repair" size="small"/>设置
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/login">
                  <FoundationSymbol type="compass" size="small"/>退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
