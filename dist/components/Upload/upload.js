var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Icon from '../Icon/icon';
import Dragger from './dragger';
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onChange = props.onChange, onError = props.onError, onRemove = props.onRemove, headers = props.headers, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var _b = useState(null), mouseIndex = _b[0], setMouseIndex = _b[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var sendFile = function (file) {
        var tempFile = {
            uid: Date.now().toString(),
            name: file.name,
            status: 'ready',
            raw: file,
            percent: 0
        };
        setFileList(__spreadArrays([tempFile], fileList));
        var formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers: __assign({ 'Content-Type': 'multipart/form-data' }, headers),
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(tempFile, {
                        percent: percentage,
                        status: 'uploading'
                    });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (res) {
            updateFileList(tempFile, {
                status: 'success',
                percent: 100
            });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            updateFileList(tempFile, {
                status: 'error',
                percent: 100
            });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                sendFile(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        sendFile(processedFile);
                    });
                }
                else if (result !== false) {
                    sendFile(file);
                }
            }
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            uploadFiles(files);
            if (fileInput.current) {
                fileInput.current.value = '';
            }
        }
    };
    var handleCilck = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var getFilePercent = function (index) {
        return (fileList[index] && fileList[index].percent) || 0;
    };
    var handleRemove = function (file) {
        setFileList(function (preFileList) {
            return preFileList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement("div", { className: 'youchen-upload' },
        React.createElement("div", { onClick: handleCilck },
            drag
                ? React.createElement(Dragger, { onFile: function (dragFileList) { uploadFiles(dragFileList); } }, children)
                : children,
            React.createElement("input", { "data-testid": 'file-input', type: "file", className: 'youchen-file-input', style: {
                    display: 'none'
                }, ref: fileInput, onChange: handleFileChange })),
        fileList.map(function (file, index) {
            return React.createElement("div", { key: file.uid },
                React.createElement("div", { className: 'file-item-layout', onMouseOver: function () { return setMouseIndex(index); }, onMouseOut: function () { return setMouseIndex(null); } },
                    React.createElement("div", { className: 'file-item-info-layout' },
                        React.createElement(Icon, { icon: 'file-alt', theme: 'secondary', className: "file-icon file-icon-" + file.status }),
                        React.createElement("p", { className: "file-item-name file-item-name-" + file.status }, file.name)),
                    React.createElement("div", { style: {
                            display: mouseIndex === index ? 'none' : 'block'
                        } },
                        file.status === 'uploading' && React.createElement(Icon, { icon: 'spinner', spin: true, theme: 'primary', className: 'file-status-icon' }),
                        file.status === 'success' && React.createElement(Icon, { icon: 'check-circle', theme: 'success', className: 'file-status-icon' }),
                        file.status === 'error' && React.createElement(Icon, { icon: 'times-circle', theme: 'danger', className: 'file-status-icon' })),
                    React.createElement(Icon, { style: {
                            display: mouseIndex === index ? 'block' : 'none'
                        }, "data-testid": 'file-remove', icon: 'times', className: 'file-close-icon', onClick: function () { return handleRemove(file); } })),
                React.createElement("div", { style: {
                        display: [0, 100].indexOf(getFilePercent(index)) === -1 ? 'block' : 'none'
                    }, className: 'upload-progress-layout' },
                    React.createElement("div", { style: {
                            width: getFilePercent(index) + "%"
                        }, className: 'upload-progress' },
                        React.createElement("p", { className: 'progress-number' },
                            getFilePercent(index),
                            "%"))));
        })));
};
Upload.defaultProps = {
    action: '#',
    drag: false
};
export default Upload;
