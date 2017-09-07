// 获取全局应用程序实例对象
// const app = getApp()
const app = getApp()
const serviceUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    operationArr: [
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAqCAYAAADMKGkhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZDMzY0QUMwN0IzOTExRTc4ODczQjBDQzRFMDk3Q0Y3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZDMzY0QUMxN0IzOTExRTc4ODczQjBDQzRFMDk3Q0Y3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkMzNjRBQkU3QjM5MTFFNzg4NzNCMENDNEUwOTdDRjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkMzNjRBQkY3QjM5MTFFNzg4NzNCMENDNEUwOTdDRjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4V4Dj8AAAEwUlEQVR42uyZe2xTdRTHz+3t+7EXVDb3Yg/YfDBgbO2iEE0IfxLUaKImRgU0bD46N5xMfCQoowswNkTKFBPQGDHEIUZjxFdgJNBuVesMGbjhBiyLi8RtjN12fXnO3a0R3dpL3yY7ydn9rTu/3++Tk3N+/d7fGIiNlaJXoy9Bd6Bb0C/MFOj3+8PagImU0Pfr6ht+lyz6tlGnYZveqCuCJYu14OidgFda+mGS876Isbv+A1D8TeLBEfrVTL18m/WTSsjNUv79+cXLHBgf6IKro+5GjDdHA1wSrdpA6K0EbT9uuAGarDBXBfR5ila6A+Mej8p+UYJuQKg3u44ZIEuvmDEm71YlfHVoOUhZ5hDGmxIOjhAv6zPkzT99boTsBYqgscalKdDzZRWkpUhbcd7mSPaNtMYb56fLmn74zAg5mQrRk6jmV6yzwdg1Tz2eKi3xzviWeWmyJqrdm4EO1DyVFZbXboZhXogn+LaiPNWOmRpRrBXnE3wlwbcgfG08SqUhPVXafP7ruwDLJOLGvvDbJFTcZ4OJSW8tlk1brDK+GRur2X7cGBVossUFauj61AAaFduKmX8uFuD1qTrpzm7cZGG2EqJpJQhvw7JRq9i9YuHFgptvK9LsImhqrFgYrs/XfEaqjOBN0ajxWtQeey6fXkmNBLG281jzy9daweny1WDNW8LNuEmrZvcIRxfEw6hsSOso5JL9mPlN4WTcRA3TjUceLRZv+xlVpQGF2ZTbV42ZPyA242/dXqxJGDRZWakWbB2VUJCjsmDmXxeTcRMKpdZLnXcDyzKQaPv9jynIXXkaPF7/U5j5g7NlvEallLR+92F5UkCTLZgvh7NY88jzLmZ+/UzgdQj9NjVGospjNiu/QwdnjlaQJH4P4Z/9Z6m0LS3VPn90XxmvIZLVzvVdhwef6YHei9fNBG4wlKVYOz+uAJmUAZ/PD/2XOFi0MHmy/v3ZP+FeYzowSItSGNLLT45RqVRVLUvloclWPWyHd44MJVWmt+zsg3setfNjlB38g362tx8ZakOdAINDHJz5cezAY/dnbUomcDya4XDHsOXJl85VZ2Kz0nUHgbtcU740c/sA3YMMoq/Bb62kyrhaydKjB+GfwGdmAJxsjISUMF5NdX4ztn3/AJzovAqcyweSIKeoF9cliHVr9FC3Pk/0+t5pHi+e44cDn0UsQKjLO06MkBj6SMiGN4S8GOnsHn1k4ApXvfe1krD3jQjc6hgnaCvBrLhTd4okr3cWbEbAdvReg75BbsO+D64M1m/Iz88PU9tHBG7/ZZx/0D3hFweXwS3z5CHndPeMk3iifnI4eifCBo+oC4UmVggNLmqOICVYfsgm6EJIMt2JtIYThb+oOZyTj+OmpzOJAU+kzYHPgc+B/4/AZQGJmywm8MhCgYs+k91uPs6NLlqXBQQTugdfgMXt4/EH9gkKfvKUbVTUgvQVr9OwT6OX6DPEXYJSHMavQl8rRiKQkfKkR6jrCXwfBZ+5oRg2PpQN0iBlQ69RwyMuflyYpwK5LHTLcE4vvrA4+XFOlgK06tnl0viEB7bu7of3jw1bUNLWiLnJKoDpf7BuDCHESMcPC+NCdDEp5IQXFp4dXRskllQcQW//9x/+EmAAPbWVH+217sEAAAAASUVORK5CYII=',
        text: '我的微商主页',
        url: '../homepage/homepage'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAoCAYAAACB4MgqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1NzJGMzY5N0IzOTExRTdCMUVGQkM2RjUxNkI4NDIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1NzJGMzZBN0IzOTExRTdCMUVGQkM2RjUxNkI4NDIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTU3MkYzNjc3QjM5MTFFN0IxRUZCQzZGNTE2Qjg0MjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTU3MkYzNjg3QjM5MTFFN0IxRUZCQzZGNTE2Qjg0MjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Mqc53AAAHiklEQVR42syZCVQURxBAa1mWa1lAEHTlECIbEQ8OURHwRFB50QhG80ii4hUZE33xIkHNpSZqBA/UXX1g1CSaKNGE531FBbwPBBXxBERARTEiCMqxqWpmyYDGsLCC9V69bqpnZ373dFVXDQC6k66osag5qOo6SrZ1qF51f6RWqxukIh0AK1Cnde0k4yaF2sGg3lZg19qw1gV37j6D/ckPYc3mXDh7sUiFphVV1/2v0pjI+WCDHtpQcAlqOWoIKhc9WzFg2liHev1wxcYcmLbg2mHsqhA+Xk9xyABX8PnrBKdljCBQib5IXl6hHoT9mfs3egwY4GOp1UMPn3wE/qPOE3y0gURv5/PyqnyaCE5gfn3voVfP6xajFnwWZj8v97iffNQwOdm4P1RdtIYm6efdAnbEuvWje+A9ge4ZHmo7TyQS5aF+qasVV/ZwM+P2b/QEmVQMVzOfQuCYFGjvZAK42o1yjsHjLsCtnFLYFecOzm2NIb/gGQSMToH0GyW0+pMbA67097HkDiBgQeFzGDIxFU6nFZFTtSo818fCwky/UeBPSirB3P3IE+zew7fgvG+DB+iLReAx5BSkZhQvQ/jpDQEPMZfpb3t0vg+LCg69kgtoH6KeCuprtWtnrLtOYmgwlwYJBwuGYddfaiye8uBsbwx3ADK3I1BZqfZC+HPa7nEuflVn1vEceoqa5ahfowYG+FnpLPgH+DEfCUTAqSWllcs9h54GI0M9WDPfhTFo65w2NlYGzPHitubBg0flcWj7nh9rT/tbV9KhnZQ1/GE07crNkkOHjhfC+BFtaALj0VmNtAEPDg6wZp1Fa7KA3yIaMTMz1dcZuKmJmDUCk+qbmEzW8e/J3oa/NuA+PT3NWYe8HuW8YKyw8HG5zsAfFVWwRmDak5L+hHV6eJhR460NuImJsfi/nnXp0rVinYHz97okMFVUVKirIYwYg4k24OkYS1mHHIUawdjuPUce6gx871F2rz0Ck7W1pYR1rlQzpGsDvjV+9z3WGdK/JTVzBWNJSWf/zsy8U9po6Jz8Mjh4vDAHnVKYac0eGdSqelKJbFJ7tQG/fPl6ST6dZKp/w5LwmFSFz81oNDj3VUYtx8cIMpjMUZEKSMsohtx7z9JwUrnaxnHVOxNSwdJcAmsXuFjy+UowP7bkwLFC1aqf7zQYOnZLLuw+8jAWwRby0B9iMydhrRt28U1/nFo3mmklSsyv1Zh+qvE4Vvt5WZDXzOHHXKk4iFvYgY1roxt+cKX7bKS3SEUBPSfA11Kd9FtXNt69ixkZla8qJF614gQ4VMpHF7wx/Lq8k/A0I6dRTYi88uP81Zn1XoklcdkQFpH+E5+Pp4iYAEd5im9XC3aNtDq2++JAuLa5ihJnzW1TdgHbVoaQnVsGCYcKYHPCXUqyyFF/QZ31lr3xJ2Pfa8OObby+XuBn0orIIWEdnsh4RqxGUxTl+f17tuBCBtpASKANtLY2YHuc8hgMAi/NFF8GrhwTIufWL3Zlf4z7PB02bM/Pxm4C6iZUP7FYFL1gejuYNcEB9PQaVkRVVakhat1tmBN9k5KpGWi6gDocs8PJk0JtYeXX7dl1QeMvUHR5Ab7uU5Vjh8u5dYtcWZUyFB0EEx9yEM2PlN3wTWxa2onlz7qQG9mlMHrmZTh54TGDw+1B+URMyxYStn08XGUwMCwFKBgI4YXgSzw7ymae/bM7pZn0mg7zXh2vgR4x2IbbEtMZXoe8P/UixO+5XwOHE5hI/nRyWzcP2oZtfJLgbsHz6Ti+TAguQ81/ktZXWlpWBTbdEx/g3x+h7tNA497jfl/9eqA1MuLTi7BtXy34MGzWoxPD9ayn0D7gxHUce1sYxxdHTGwrpQjSJ/ScJn5qoCM7KqSvHZqE8n83F1NOU3ci5AZiwcIaFI4m5LgKHFsgXHGKn8zjeww/cwb/7s7b7VGPZSf62tvLjaAphE5rW59kqvp9EDyLX/mc20l+dibGetDSK7EQ7Va04r6a+BkZdaPuaRX53Yx2TQZNIrc2hEURznL+U0jNKT536U12ijvZGVviRJwI/IPQIdVJzV8nWFq8nr/Y0drSgIsMd4SmFty2gBUYbRnNw2O277vPOiODbFhTs+JUxdO3E2EONGOCAzSXTB/vUHNK49YoLn5aybIDXy+2O/wI3JZOx4xbT8kgTPnCwkLkzQaO5wnubYhgCUG1ZGXlloKjLdu2jgQuFuPph6cXGSr5i7y93c2pYG42cNym4OPJVteHNxUXl1SCoQELhKy8kUgkIih7VkWGMvIP1F69ql9Js0rvboyhNzkjLWolpgmYbpBNXJMd9nAzh9mc4yD06jz6XODiLG12cFcFY+iIkeQWsrl3VJjWKiRU0ZhqykzFQIkTxUoUJyc7o2YHd2jDGByoBiU2SsxUm1jxoqKEJurblZlGy9bnTCFLUXEFxXE3A4les4NL9Nm2kGAqrbLwOMrxfPRFTUngFCCnokFTEBehJvOVyRshfNb4Bd8nPhB+kiqqfS28UaIB/r9iudGfkHUh5jLGYK5NlY/BvqzZwW/nMYbb2vwmCHUHvPhvv6ZW+hj07suq/H8EGACwq2rtoOf6jQAAAABJRU5ErkJggg==',
        text: '关联我的代理',
        url: '../relevanceAgent/relevanceAgent'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkwRDY2MzREN0IzOTExRTc4QUYzRjc1QjhCN0E3QjIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkwRDY2MzRFN0IzOTExRTc4QUYzRjc1QjhCN0E3QjIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTBENjYzNEI3QjM5MTFFNzhBRjNGNzVCOEI3QTdCMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTBENjYzNEM3QjM5MTFFNzhBRjNGNzVCOEI3QTdCMjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xfgorAAAG8UlEQVR42syZ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',
        text: '我关联的上家',
        url: '../RHO/RHO'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAnCAYAAACbgcH8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDODdBRjk2N0IzOTExRTc4MEZFQzQ1NTdFNjNCODgzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDODdBRjk3N0IzOTExRTc4MEZFQzQ1NTdFNjNCODgzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUM4N0FGOTQ3QjM5MTFFNzgwRkVDNDU1N0U2M0I4ODMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUM4N0FGOTU3QjM5MTFFNzgwRkVDNDU1N0U2M0I4ODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4C9Ln1AAAJQklEQVR42qxZ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',
        text: '我关联的团队',
        url: '../relevanceTeam/relevanceTeam'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNCNDI5QUU4ODIzNDExRTc5OERBRDBERTlENkRFRUUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNCNDI5QUU5ODIzNDExRTc5OERBRDBERTlENkRFRUUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0I0MjlBRTY4MjM0MTFFNzk4REFEMERFOUQ2REVFRTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0I0MjlBRTc4MjM0MTFFNzk4REFEMERFOUQ2REVFRTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4BshECAAAGNElEQVR42txa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',
        text: '我的邀请码',
        url: '../tuiguang/tuiguang'
      },
      {
        icon: '',
        text: ' ',
        url: ''
      }
    ],
    danbao_money: 321,
    saleArr: [
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAvCAMAAACSXLn7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB1UExURUxpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7bQ2pbHHppIIx5Jda4OHFhHV5RGOvLPoJxIsarNBYSBbifMCchCqeQLEk/E+DCOvfVQZuGKDkxDzBLojoAAAAUdFJOUwAZJcqH/hDl8m4Fo0i3lGE13Fl7ck8oWQAAAYZJREFUSMedlulygyAUhREkgFs0grt1z/s/YnViGw1Ioff3+ebM4S4KgKogwpgEwLxIznn35RjrmeBrNb4xQIsN4MYWLwMLC/IyWC1uRvp7tet5FpkZtD+AmcXbwNDiYGBk8TgYrBaunQGf8c0iwValJsUtvrshbs/ALFDEAqnlMGA+os8q77hUbV6OOAnde7xj0A2TfiyHtuaXNU9dXj0p8teRD/qmm7hRzcUwMkAHblEFBphb1T8AlNvoFwogtSAWHK/PShpTfU7jrRFOkpnpGwr3mUDCSE9+J8QzIcrkOFHhn4RA3mn8fGGnByAStU4fyuvgal53UJ005+saGAOD5Tx1THULouUa6BQRAGqvgYnIeo/qXqmHEhD3ujYoUj8qHZClchu0a6FoRNhplz+Rb+op85SJ4rzLnzcWHjPXDU0ZKY/IM77OXGfUXUffOyElu8q8yXf7I7J8pk6zT/kZySNpVgdJviNb/E5udUCEIKnie+OxRJT0ofiDYQyqvzQOY+83+gY+hWQ63YlDbwAAAABJRU5ErkJggg==',
        text: '我的收藏',
        url: '../myCollect/myCollect'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAMAAACPHmKLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB7UExURUxpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7bQ2laG0U7Eo97JnRkHruhMcquNerKPYd1IyYhCvnWQeHCO6+XLlRIFnxqIF1QGKaPLDYuDta5OJyHKRgUBshtxZQAAAAUdFJOUwAM5xdWkEYlvNs5n2P7yu+HcrB83NvgowAAAfNJREFUSMeVlum6giAQhtHcFbfAfanU6v6v8IBiAh1N5kdPyXwO7zcjBoBaaIGiwNB1tfxwaGKFfMu5l+hunM730uyGEGrtk/kXf3qRfFSfxNCu0QPNUTqnBIle9IsAnQIPXPykyR39OAFODK1oal/B7gy4FxJDZ4EeUsUvcNvPxmX7t8jU65/gFxM2jLfQLff5C5wa2jEBdjV/7sYRODG0RqsgBGaxfN0FXw1dBCm44qXcHrjn4OqTX2MfBLg/6riXTuMnH1U4Bsb9edBxm00ci1sWAG8q15/f4BezzZEgsIDdbiVlcC2GTccLRiLQou0eMngQbYbOkUMLAPexXRDBLTZxWzx0sgcHc1d4cMuZH0kueuxoAJi8gANPdDkflcOVLKydY/G+LH4mfIM/zPR2xtALZV0G/MaVLMihR3uZiQu3dG1CEE654FLhUt9tOEpWXLnJMKOh3FZcjXYnyqXKpDvCAexMr45VmAH5RgjgXCEfFmTjs6tSIwRwYayS8E6Gm5b8Fmzg0mGTLPVg1sgO8uD/HuRx2BblPvj/h0/iEFG3C74ngsNY74HvHFuGH2X5cw/8Y4DYLMt0sx+nepr50gNq+cfgcZO3vq3yUjXJTOWtoahg83Ve8Yo0tV1VkwfUFIPi/w8Tx2oCEOqKAhAc9OIP191Ew4e4kf4AAAAASUVORK5CYII=',
        text: '发布记录',
        url: '../releaseProduct/releaseProduct'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAMAAABEQrEuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABsUExURUxpcQAAAAAAAAYFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7bQ/HQQKyVLbuhMeTFPGBSGJqFKEg+E2pbHAAAANCzNi4oDHppII16JcarNPjVQbWcL6eQLNy9OrhQm9EAAAARdFJOUwDNnvoD5GLyrbx9KT5RjhDZBFkhzQAAAZtJREFUSMftVdmWrCAMBNwQ12grIILa8///OGAv9rR5mHm7556uJ6lKhRDigZAnGkGzrOVpQ15QsUDWBUFQJNZ0nbmOmYgfXNoqGUg3p2dDE0mA3joDg27LW45cGzDSyhWW+bxLbWFTXNR0lnBVIWWZOU+1TDCfTNKTo/0CVYWPko/LMqakmGWn6U4V0QpR82aIs8480qSqX1TVykHXd4ZJmMt3RzJI9liUymxqAy2eHdBwPghdzFGqjwDQ/DikXKP43SHsa6l0gZcYX3KfI91drTg2GeEoMqxUeb6QWg8HXcwwVs9k2eIodumJ7lX14kiPYbAROiaE95vK923i3IFJ9qiCzc7Qn7OW3lGl/qKuitaiTkKvXMSEyP0IwFSXz6CGcKXHG5SefBwYZ90AsACs0tpLoCan7jF6pGSPOmEZ9+QIJpJ1CN1lFSn9pGEK7vhKbsP0e8eQxKF1H8f/6Zh6DJN30A1VCOMYmHcIXCH/JniOgYdz4AqZLhj2XuHKZxI/jl84/Cvz17+2wxBe5vyCKROpMwytdzBU4d+KSHCCRcatngAAAABJRU5ErkJggg==',
        text: '我的买到',
        url: '../buy/buy'
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAMAAABEQrEuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB7UExURUxpcQAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7bQ7yiMlhMFy0mC2dZG09DFH9tIfLRQJmEKLCYLqOMK9a5OMmuNUA3EevKPuLDO3BgHY56JaeRLPrYQh4Lh98AAAAVdFJOUwCaZ7LypPy9VgxHNtcgzBaJeizlBepH6IwAAAHOSURBVEjH7ZXbukMwEIUJ4tA4VUNCow5F3/8Jd0IPtEHc73VVzF/fTNYamraiKNSOCVDjGHAmFQVHgIvJcEVOBwi7wxgz86IMxBQLdbYq4DX3kcA0UgNCOEwAbnNPiQgK/FIJVU5Fp/ijAu0DTobnovr+0aV4iYA9oL9yPasf/Ge9jbgBNIXqCRgvIDxvucN3hcDU/GCNV6HCvLx8JJiu7JLnvG7WPyGVrzsbhG99R/ikwwK664TRN7Yzi1BsE1Y2QbhOWKRP8yCaXnTmf58WxPA2++BVNO3HqoiwR4XihdtAlgtli80QAjvFZa5rqOLhNJZ7xncmfXUbQ4wrpNkiQR00nJ2Jn3ST8hWT2hPBX5Oh2F/PDQgaNubsQ/D3FdCSL5tzlND6WTUneOZuTQDcHwMYpG/fNUuCq6amPu/Xj1Fezgt+CL4HGbGd5+g8CxbV8rGEEHezJPLHbm+Pn2dSAuM798CnWxVCjLuV3t4gVsSJgF2PECUSp99ViuXtZF4eD5QPCvU1TaK3xT2DFPfN8iv79oMfJdn6DKpuaYWXgXh2pSMtcxSH6xmoJYe59f0U1hh+DLP3KXjb7zoz5ba4xbPyXsu7Xd2jRhIAebd/hPFTe/v7yksAAAAASUVORK5CYII=',
        text: '我的卖出',
        url: '../mySale/mySale'
      }
    ],
    items: [
      {
        name: '已阅读并承诺遵守《担保金说明》条例',
        value: '已阅读并承诺遵守《担保金说明》条例',
        checked: true
      }
    ],
    pLevel: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5']
  },
  mask3confirm () {
    if (!this.data.items[0].checked) {
      return wx.showToast({
        title: '请勾选同意本平台担保金说明'
      })
    }
    this.setData({
      mask3: false,
      mask2: true
    })
  },
  sss () {
    this.setData({
      mask3: false
    })
  },
  checkboxChange () {
    this.data.items[0].checked = !this.data.items[0].checked
    this.setData({
      items: this.data.items
    })
  },
  // 充值金额输入
  inputValue (e) {
    this.setData({
      chargeMoney: e.detail.value
    })
  },
  // 充值
  charge () {
    if (!this.data.items[0].checked) {
      return wx.showToast({
        title: '请同意担保金充值条款，方可充值'
      })
    }
    let that = this
    let c = {
      url: serviceUrl.payByGuarantee,
      data: {
        session_key: app.gs(),
        money: that.data.chargeMoney
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // 吊起微信支付
          let obj = {
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            paySign: res.data.data.paySign,
            success (res) {
              if (res.errMsg === 'requestPayment:ok') {
                // 微信支付成功
                that.setData({
                  mask2: false
                })
                that.getUserInfo()
              } else {
                // 微信支付失败
              }
            },
            fail (res) {
              // 调用支付失败
              console.log(res)
            }
          }
          app.wxpay(obj)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(c)
  },
  showTixian () {
    this.setData({
      mask4: true
    })
  },
  showDb () {
    this.setData({
      mask2: false,
      mask3: true
    })
  },
  // 弹窗操作
  maskOp (e) {
    if (e.currentTarget.dataset.type === 'confirm') {
      this.setData({
        mask: false,
        mask2: true
      })
    } else if (e.currentTarget.dataset.type === 'cancel') {
      this.setData({
        mask: false,
        mask3: false,
        mask2: false,
        mask4: false
      })
    } else if (e.currentTarget.dataset.type === 'detail') {
      wx.navigateTo({
        url: '../moneyList/moneyList'
      })
    } else if (e.currentTarget.dataset.type === 'tdb') {
      this.setData({
        mask: false,
        mask5: true
      })
    } else if (e.currentTarget.dataset.type === 'dbc') {
      this.setData({
        mask5: false
      })
    } else if (e.currentTarget.dataset.type === 'tlq') {
      this.setData({
        mask4: false,
        mask5: true
      })
    }
  },
  // 充值担保金mask
  showMask () {
    this.setData({
      mask: true
    })
  },
  // 底部导航url
  chooseOperation (e) {
    if (e.currentTarget.dataset.type === 'left') {
      wx.redirectTo({
        url: '../index/index'
      })
    } else if (e.currentTarget.dataset.type === 'center') {
      wx.navigateTo({
        url: '../faburuler/faburuler'
      })
    }
  },
  // 获取用户信息
  getUserInfo () {
    let that = this
    let s = {
      url: serviceUrl.userCenter,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            user: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(s)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getUserInfo()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
