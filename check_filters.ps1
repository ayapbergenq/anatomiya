$pdfPath = "d:\Ayapbergenov Qadirbergen\odam-anatomiyasi_-atlas_-1-jild-n_ahmedov-2.pdf"
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes, 0, [Math]::Min($bytes.Length, 1000000))

# Search for image filters
$matches = [System.Text.RegularExpressions.Regex]::Matches($text, "/Filter\s*/([A-Za-z0-9]+)")
$filters = @{}
foreach ($m in $matches) {
    $f = $m.Groups[1].Value
    if (-not $filters.ContainsKey($f)) { $filters[$f] = 0 }
    $filters[$f]++
}
$filters | Out-String | Write-Host
