$ports = @(8080, 8085, 8000, 3000, 5500)
$listener = $null
$boundPort = $null

foreach ($p in $ports) {
    try {
        $tempListener = New-Object System.Net.HttpListener
        $prefix = "http://localhost:$p/"
        $tempListener.Prefixes.Add($prefix)
        $tempListener.Start()
        $listener = $tempListener
        $boundPort = $p
        Write-Host "========================================="
        Write-Host "  Local server started successfully!     "
        Write-Host "  URL: http://localhost:$p/               "
        Write-Host "========================================="
        break
    } catch {
        if ($tempListener) {
            $tempListener.Close()
        }
    }
}

if (-not $listener) {
    Write-Error "Could not bind to any test port."
    exit 1
}

$root = $PSScriptRoot
if (-not $root) {
    $root = "d:\Ayapbergenov Qadirbergen"
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".gif"  = "image/gif"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".pdf"  = "application/pdf"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".otf"  = "font/otf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.LocalPath.TrimStart('/')
        if ($rawPath -eq "" -or $rawPath -eq "/") {
            $rawPath = "index.html"
        }

        $decodedPath = [System.Uri]::UnescapeDataString($rawPath)
        $filePath = Join-Path $root ($decodedPath.Replace('/', '\'))

        # Add basic CORS headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $contentType = $mimeTypes[$ext]
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $decodedPath")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    } catch {
        # ignore client disconnects
    }
}
