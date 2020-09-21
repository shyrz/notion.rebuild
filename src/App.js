import React, { useState, useRef } from 'react';
import {
  Collapse,
  Form,
  Switch,
  Button,
  Input
} from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard';

import { MinusCircleOutlined, PlusOutlined, CheckCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';


import CodeGenerator from './utils/CodeGenerator'
import './App.less';

const { Panel } = Collapse;

export default function App() {

  // Hooks
  const [slugs, setSlugs] = useState([]);
  const [domain, setDomain] = useState("");
  const [domainURL, setDomainURL] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [customFonts, setCustomFonts] = useState("");
  const [customScripts, setCustomScripts] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);
  // const [optional, setOptional] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handles  
  const handleDomain = e => {
    setDomain(e.target.value);
    setCopied(false);
  };

  const handleDomainURL = e => {
    setDomainURL(e.target.value);
    setCopied(false);
  };

  const handlePageTitle = e => {
    setPageTitle(e.target.value);
    setCopied(false);
  };

  const handlePageDescription = e => {
    setPageDescription(e.target.value);
    setCopied(false);
  };
  const handleCustomFonts = e => {
    setCustomFonts(e.target.value);
    setCopied(false);
  };
  const handleCustomScripts = e => {
    setCustomScripts(e.target.value);
    setCopied(false);
  };
  const addSlug = () => {
    setSlugs([...slugs, ["", ""]]);
    setCopied(false);
  };
  const deleteSlug = index => {
    setSlugs([...slugs.slice(0, index), ...slugs.slice(index + 1)]);
    setCopied(false);
  };
  const handleSlug = (value, index) => {
    setSlugs([
      ...slugs.slice(0, index),
      [value, slugs[index][1]],
      ...slugs.slice(index + 1)
    ]);
    setCopied(false);
  };
  const handleSlugURL = (value, index) => {
    setSlugs([
      ...slugs.slice(0, index),
      [slugs[index][0], value],
      ...slugs.slice(index + 1)
    ]);
    setCopied(false);
  };
  const handleDarkMode = isDarkMode => {
    setDarkMode(isDarkMode);
  };
  // const handleOptional = () => {
  //   setOptional(!optional);
  // };

  const code = CodeGenerator({
    domain,
    domainURL,
    slugs,
    pageTitle,
    pageDescription,
    customFonts,
    customScripts
  });
  const codes = useRef("");
  const copy = () => {
    // codes.current.select();
    console.log(codes.current);
    document.execCommand("copy");
    setCopied(true);
  };




  const onFormFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <div className="App">
      <Form
        name="code-generate-form"
        layout="vertical"
        onFinish={onFormFinish}
      >

        <Form.Item label="Domain">
          <Input
            placeholder="example.com"
            onChange={handleDomain}
          />
        </Form.Item>

        <Form.Item label="Notion URL for Domain">
          <Input
            placeholder="https://www.notion.so/Notion-Rebuild-adeb571cc8004db19f2a425f19eab678"
            onChange={handleDomainURL}
          />
        </Form.Item>

        

        <Form.Item label="Pretty Links">
          <Form.List>
            {(fields, { add, remove }) => {
              return (
                <>
                  {slugs.map(([slug, slugURL], index) => {
                    return (
                      <>
                        <Form.Item
                          // {...slug}
                          // name={[slug.name, 'slug']}
                          // fieldKey={[slug.fieldKey, 'slug']}
                          rules={[{ required: true, message: 'Missing Slug' }]}
                        >
                          <Input.Group compact>
                            <Input
                              prefix="/"
                              placeholder="slug"
                              onChange={e => handleSlug(e.target.value, index)}
                              style={{ width: '30%' }}
                            />
                            <Input
                              placeholder="URL"
                              onChange={e => handleSlugURL(e.target.value, index)}
                              style={{ width: 'calc(70% - 32px)' }}
                            />
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              style={{ width: '32px' }}
                              onClick={() => { deleteSlug(index) }} 
                              danger
                            />
                          </Input.Group>
                        </Form.Item>
                      </>
                    );
                  })}
                </>
              );
            }}
            
          </Form.List>

          <Button type="dashed" onClick={addSlug} block>
            <PlusOutlined /> Add Pretty Link
          </Button>
        </Form.Item>
        
        {/* Page */}
        <Form.Item label="Page">
          <Input.Group>
            <Input
              placeholder="Title"
              onChange={handlePageTitle} />
            <Input.TextArea
              placeholder="Description"
              onChange={handlePageDescription} />
          </Input.Group>
        </Form.Item>

        {/* Custom Fonts */}
        <Form.Item label="Custom Fonts">
          <Input placeholder="Rubik, Noto Sans SC..." onChange={handleCustomFonts} />
        </Form.Item>
        
        {/* Custom Scripts */}
        <Form.Item label="Custom Scripts">
          <Input.TextArea placeholder="Google Analytics..." onChange={handleCustomScripts} />
        </Form.Item>
        
        {/* Dark Mode */}
        <Form.Item label="Use Dark Mode">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleDarkMode}
          />
        </Form.Item>

        {/* Copy */}
        <Form.Item>
          <CopyToClipboard
            text={code}
            onCopy={() => setCopied(true)}>
            <Button
              type="primary"
              icon={copied ? <CheckCircleOutlined /> : null}
            >{ copied ? 'Copied!' : 'COPY THE CODE' }</Button>
          </CopyToClipboard>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{ maxHeight: '100vh', border: '1px solid #d9d9d9', borderRadius: '3px' }}
          >
            { code }
          </SyntaxHighlighter>
        </Form.Item>
      </Form>
    </div>
  )
}
