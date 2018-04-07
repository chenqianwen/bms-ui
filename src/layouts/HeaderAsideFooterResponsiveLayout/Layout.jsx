/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, {Component} from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import {Icon} from '@icedesign/base';
import Menu, {SubMenu, Item as MenuItem} from '@icedesign/menu';
import DynamicIcon from 'dynamic-icon';

import FoundationSymbol from 'foundation-symbol';
import {enquire} from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';import {Link} from 'react-router';
import Logo from './../../components/Logo';
import {asideNavs} from './../../navs';
import './scss/light.scss';
import './scss/dark.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
// const themeDeafult = typeof THEME === 'undefined' ? 'dark' : THEME;
const CustomIcon = DynamicIcon.create({
  fontFamily: 'iceicon2',
  prefix: 'ice-icon-stable',
  css: 'https://at.alicdn.com/t/font_107674_7dns782b1jsb57b9.css'
});

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getOpenKeys();
    this.state = {
      collapse: false,
      openDrawer: false,
      isScreen: undefined,
      theme: 'dark',
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  toggleCollapse = () => {
    const {collapse} = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleMenu = () => {
    const {openDrawer} = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 响应式时点击菜单进行切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const {routes} = this.props;
    const matched = routes[0].path;
    let openKeys = [];
    HeaderAsideFooterResponsiveLayout
    asideNavs &&
    asideNavs.length > 0 &&
    asideNavs.map((item, index) => {
      if (item.to === matched) {
        openKeys = [`${index}`];
      }
    });

    return openKeys;
  };

  /**
   * 切换主题
   */
  toggleTheme = () => {
    const themeName = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({
      theme: themeName,
    });
  };

  render() {
    const {location = {}} = this.props;
    const {pathname} = location;

    return (
      <Layout
        style={{minHeight: '100vh'}}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-${this.state.theme}`,
          {
            'ice-design-layout': true,
          },
        )}
      >
        {/* 头部logo和个人信息 */}
        <Header
          theme={this.state.theme} selectedKeys={[pathname]}
          isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
        />
        <Layout.Section>
          {/* 手机 切换菜单的按钮就是- -分类- - */}
          {this.state.isScreen === 'isMobile' && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small"/>
            </a>
          )}
          {this.state.openDrawer && (
            <div className="open-drawer-bg" onClick={this.toggleMenu}/>
          )}
          {/* 切换主题的按钮 */}
          <a className="theme-btn" onClick={this.toggleTheme}>切换主题</a>
          {/* 侧边菜单 begin */}
          <Layout.Aside
            width="auto"
            theme={this.state.theme}
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            {/* 不是手机 切换菜单的按钮就是- -箭头- - */}
            {this.state.isScreen !== 'isMobile' && (
              <a className="collapse-btn" onClick={this.toggleCollapse}>
                <Icon
                  type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                  size="small"
                />
              </a>
            )}
            {/* 如果是手机，在Menu上显示logo  */}
            {this.state.isScreen === 'isMobile' && <Logo/>}
            {/*{渲染左侧菜单--------------------}*/}
            <Menu
              style={{width: this.state.collapse ? 60 : 200}}
              defaultSelectedKeys={[pathname]}
              inlineCollapsed={this.state.collapse}
              mode="inline"
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              onClick={this.onMenuClick}
            >
              {asideNavs &&
              asideNavs.length > 0 &&
              asideNavs.map((nav, index) => {
                {/*{如果有二级菜单}*/}
                if (nav.children && nav.children.length > 0) {
                  return (
                    <SubMenu key={index} title={
                      <span>{nav.icon ? (<CustomIcon size="small" type={nav.icon} />) : null}
                        <span className="ice-menu-collapse-hide">
                            {nav.text}
                          </span>
                        </span>
                      }
                    >
                      {/*{遍历二级菜单}*/}
                      {nav.children.map((item) => {
                        {/*{如果有三级菜单}*/}
                        if (item.children && item.children.length > 0) {
                          return (
                            <SubMenu key={item.to} title={
                              <span>{nav.icon ? (<FoundationSymbol size="small" type={nav.icon}/>) : null}
                                <span style={{padding:0}}>
                                  {item.text}
                                </span>
                              </span>
                            }
                            >
                              {/*{遍历三级级菜单}*/}
                              {item.children.map((third) => {
                                const linkProps = {};
                                if (third.newWindow) {
                                  linkProps.href = third.to;
                                  linkProps.target = '_blank';
                                } else if (third.external) {
                                  linkProps.href = third.to;
                                } else {
                                  linkProps.to = third.to;
                                }
                                return (
                                  <MenuItem key={third.to}>
                                    <Link {...linkProps}>{third.text}</Link>
                                  </MenuItem>
                                );
                              })
                              }
                            </SubMenu>
                          )
                        }
                        {/*{如果没有三级菜单}*/}
                        const linkProps = {};
                        if (item.newWindow) {
                          linkProps.href = item.to;
                          linkProps.target = '_blank';
                        } else if (item.external) {
                          linkProps.href = item.to;
                        } else {
                          linkProps.to = item.to;
                        }
                        return (
                          <MenuItem key={item.to}>
                            <Link {...linkProps}>{item.text}</Link>
                          </MenuItem>
                        );
                      })}
                    </SubMenu>
                  );
                }
                {/*{如果没有二级菜单}*/}
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <MenuItem key={nav.to}>
                    <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon}/>
                          ) : null}
                          <span className="ice-menu-collapse-hide">
                            {nav.text}
                          </span>
                        </span>
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>
        <Footer/>
      </Layout>
    );
  }
}
